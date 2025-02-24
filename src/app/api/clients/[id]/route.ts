import postgres from "postgres";
import { z } from  'zod';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

const clientSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, "Por favor preencha o nome do cliente."),
    phone: z.string().min(18, "Por favor insira um telefone válido.")
});
const clientEditSchema = clientSchema.omit({id: true});

export async function PATCH(req: Request, {params}: {params: Promise<{id: string}>}){
    const { id } = await params;
    const data = await req.formData();
    const validateClient  = clientEditSchema.safeParse({
        name: data.get("name"),
        phone: data.get("phone")
    });
    if (!validateClient.success){
        return Response.json(validateClient.error.flatten().fieldErrors);
    }
    const {name, phone} = validateClient.data;

    try {
        const verifyId = (await sql`SELECT * FROM clients WHERE id = ${id}`);
        if(verifyId[0] == null) {
            return Response.json({message: "Id not found."},{status: 404, statusText: "Not found."});
        }
        await sql`UPDATE clients SET name = ${name}, phone = ${phone} WHERE id = ${id}`;
        return Response.json({message: "Data updated sucessful"});
    } catch (error) {
        return Response.json({error: error, message: "Failed to update clients data."}, {status: 400, statusText: "Bad Request."});
    }
}

export async function DELETE(req: Request, {params}: {params: Promise<{id: string}> } ){
    const {id} = await params;
    try {
        await sql`DELETE FROM clients WHERE id = ${id}`;
        return Response.json({message: "Data delete sucessful!"});
    } catch (error) {
        return Response.json({error: error, message: "Error to delete from database"}, {status: 400, statusText: "Bad Request."});
    }
}

export async function GET(req: Request,{params}: {params: Promise<{id: string}> } ){
    const { id } = await params;
    try {
        const client = await sql`SELECT * FROM clients WHERE id = ${id}`;
        return Response.json(client); 
    } catch (error) {
        return Response.json({error: error, message: "Error to get client."}, {status: 400, statusText: "Bad Request"});
    }
}