import { z } from 'zod';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});


const OrderSchema = z.object({
    id: z.string().uuid(),
    order_details: z.string().min(1, "Por favor digite o produto a ser encomendado."),
    price: z.coerce.number({invalid_type_error: "O preço precisa ser um valor em Reais. Ex: 30"}).gt(0),
    status: z.enum(["Entregue", "Nao Entregue"], {message: "Por favor, coloque o status da encomenda corretamente."}),
    created_at: z.string().datetime({message: "Por favor selecione uma data e hora(s)."}),
    delivery_time: z.string().datetime({message: "Por favor selecione uma data e hora(s)."}),
    client_id: z.string().uuid({message: "Selecione um cliente."})    
});

const OrderSendSchema = OrderSchema.omit({id: true});

export async function POST(req: Request) {
    const data = await req.formData();
   const validatedOrder = OrderSendSchema.safeParse(
    {
        order_details: data.get("order_details"),
        price: data.get("price"),
        status: data.get("status"),
        created_at: data.get("created_at"),
        delivery_time: data.get("delivery_time"),
        client_id: data.get("client_id")
    });
    if (!validatedOrder.success){
        return Response.json(validatedOrder.error.flatten().fieldErrors);
    }
    const {order_details, price, status, created_at, delivery_time, client_id} = validatedOrder.data;
    try {
        await sql`INSERT INTO orders (order_details, price, status, created_at, delivery_time, client_id) VALUES (${order_details}, ${price}, ${status}, ${created_at}, ${delivery_time}, ${client_id})`;
        return Response.json({message: "Order Created sucessful."});
    } catch (error) {
        return Response.json({error: error, message: "Failed to insert in database"}, {status: 400, statusText: "Bad Request"});
    }
}

export async function GET(){
    try {
        const orders = await sql`SELECT orders.id, orders.order_details, orders.price,orders.status, orders.created_at, orders.delivery_time, clients.name FROM orders INNER JOIN clients ON orders.client_id=clients.id`;
        return Response.json(orders, {status: 200, statusText: "Ok."});
    } catch (error) {
        return Response.json({error: error}, {status: 400, statusText: "Bad Request."});
    }
}