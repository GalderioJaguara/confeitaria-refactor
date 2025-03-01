import { z } from 'zod';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

const clientSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, "Por favor preencha o nome do cliente."),
    phone: z.string().min(14, "Por favor insira um telefone válido.")
})

const clientRegister = clientSchema.omit({id: true});

export async function POST(req: Request){
    const data = await req.json();
    const validateClient = clientRegister.safeParse({
        name: data.name,
        phone: data.phone
    });
    if (!validateClient.success) {
        const errorMessage = {name: "", phone: ""};
        validateClient.error.issues.map((err) => {
            if (err.path[0] == 'name') {
                errorMessage.name = err.message; 
            }
            if (err.path[0] == 'phone') {
                errorMessage.phone = err.message;
            }
        });
        return Response.json(errorMessage, {status: 400, statusText: "Bad Request"});
    }
    const {name, phone} = validateClient.data;

    try {
        await sql`INSERT INTO clients (name, phone) VALUES (${name}, ${phone})`;
        return Response.json({message: "Client register sucessful!"});
    } catch(error) {
        return Response.json({error: error, message: "Failed to send to database."}, {status: 400, statusText: "Bad Request."});
    }

}

export async function GET (){
    try {
        const clients = await sql`SELECT * FROM clients`;
        return Response.json(clients);
    } catch(error) {
        return Response.json({error: error, message: "Failed to get data."}, {status: 400, statusText: "Bad Request."});
    }
}