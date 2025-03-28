import postgres from "postgres";
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

const orderSchema = z.object({
    id: z.string().uuid(),
    order_details: z.string().min(1, "Por favor digite o produto a ser encomendado."),
    price: z.coerce.number({invalid_type_error: "O preço precisa ser um valor em Reais. Ex: 30"}).gt(0, {message: "O preço precisa ser um valor em Reais. Ex: 30"}),
    status: z.enum(["Entregue", "Nao Entregue"], {message: "Por favor, coloque o status da encomenda corretamente."}),
    created_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Formato inválido").transform((val: any) => new Date(val.replace("T", " ") + ":00")),
    delivery_time: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Formato inválido").transform((val: any) => new Date(val.replace("T", " ") + ":00")),
    client_id: z.string().uuid({message: "Selecione um cliente."})    
});

const orderUpdateSchema = orderSchema.omit({id: true});

export async function PATCH(req: Request, {params}: {params: Promise<{id: string}>}) {
    const data = await req.json();
    const { id } = await params;
    const validatedOrder = orderUpdateSchema.safeParse(
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

    try {
        const verifyId = await sql`SELECT * FROM orders WHERE id = ${id}`;
        if (verifyId[0] == null){
            return Response.json({message: "Id not found"}, {status: 404, statusText: "Not Found"});
        }
        await sql`UPDATE orders SET order_details = ${order_details}, price = ${price}, status = ${status}, created_at = ${created_at}, delivery_time = ${delivery_time}, client_id = ${client_id} WHERE id = ${id}`;
        return Response.json({message: "Order updated sucessful"}, {status: 200});

    } catch (error) {
        console.log(error);
        return Response.json({error: error, message: "Failed to update orders"}, {status: 400, statusText: "Bad Request"});
    }
}

export async function DELETE(req: Request,{params}: {params: Promise<{id: string}>}){
    const { id } = await params;
    try {
        await sql`DELETE FROM orders WHERE id = ${id}`;
        return Response.json({message: "Data delete sucessful"});
    } catch (error) {
        return Response.json({error: error, message: "Error from delete order."}, {status: 400, statusText: "Bad Request."})
    }
}

export async function GET (req: Request, {params}: {params: Promise<{id: string}>}){
    const { id } = await params; 
    try {
        const order = await sql`SELECT * FROM orders WHERE id = ${id}`;
        return Response.json(order);
    } catch (error) {
        return Response.json({error: error, message: "Error to get order."}, {status: 400, statusText: "Bad Request"});
    }
}