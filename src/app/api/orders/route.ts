import { z } from 'zod';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});


const OrderSchema = z.object({
    id: z.string().uuid(),
    order_details: z.string().min(1, "Por favor digite o produto a ser encomendado."),
    price: z.coerce.number({invalid_type_error: "O preço precisa ser um valor em Reais. Ex: 30"}).gt(0, {message: "O preço precisa ser um valor em Reais. Ex: 30"}),
    status: z.enum(["Entregue", "Nao Entregue"], {message: "Por favor, coloque o status da encomenda corretamente."}),
    created_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Formato inválido").transform((val: any) => new Date(val.replace("T", " ") + ":00")),
    delivery_time: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Formato inválido").transform((val: any) => new Date(val.replace("T", " ") + ":00")),
    client_id: z.string().uuid({message: "Selecione um cliente."})    
});

const OrderSendSchema = OrderSchema.omit({id: true});

export async function POST(req: Request) {
    const data = await req.json();

    const validatedOrder = OrderSendSchema.safeParse(
    {
        order_details: data.order_details,
        price: data.price,
        status: data.status,
        created_at:  data.created_at,
        delivery_time: data.delivery_time,
        client_id: data.client_id
    });
    if (!validatedOrder.success) {
        const errorMessage = {
            order_details: "",
            price: "",
            status: "",
            created_at: "",
            delivery_time: "",
            client_id: "",
            message: ""
        };
      
        validatedOrder.error.issues.forEach((err) => {
            if (err.path[0] === "order_details") {
                errorMessage.order_details = err.message;
            }
            if (err.path[0] === "price") {
                errorMessage.price = err.message;
            }
            if (err.path[0] === "status") {
                errorMessage.status = err.message;
            }
            if (err.path[0] === "created_at") {
                errorMessage.created_at = err.message;
            }
            if (err.path[0] === "delivery_time") {
                errorMessage.delivery_time = err.message;
            }
            if (err.path[0] === "client_id") {
                errorMessage.client_id = err.message;
            }
        });
      
        return Response.json(
            errorMessage,
            { status: 400, statusText: "Bad Request" }
        );
    }
    const {order_details, price, status, created_at, delivery_time, client_id} = validatedOrder.data;
    const int_price = price * 100;

    try {
        await sql`INSERT INTO orders (order_details, price, status, created_at, delivery_time, client_id) VALUES (${order_details}, ${int_price}, ${status}, ${created_at}, ${delivery_time}, ${client_id})`;
        return Response.json({message: "Order Created sucessful."});
    } catch (error) {
        return Response.json({error: error, message: "Failed to insert in database"}, {status: 400, statusText: "Bad Request"});
    }
}

export async function GET(){
    try {
        const orders = await sql`SELECT orders.id, orders.order_details, orders.price,orders.status, orders.created_at, orders.delivery_time, orders.client_id, clients.name FROM orders INNER JOIN clients ON orders.client_id=clients.id`;
        return Response.json(orders, {status: 200, statusText: "Ok."});
    } catch (error) {
        return Response.json({error: error}, {status: 400, statusText: "Bad Request."});
    }
}