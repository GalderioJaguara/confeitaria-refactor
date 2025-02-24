import postgres from "postgres";
import z from 'zod';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { redirect } from "next/navigation";

dotenv.config();

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

const userSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(1, "Por favor digite um nome de usuário"),
    email: z.string().email('Email inválido'),
    password: z.string().min(1, "O campo de senha não pode ser nulo!"),
    password_confirm: z.string().min(1, "O campo de senha não pode ser nulo!")   
});

const registerSchema = userSchema.omit({id: true});

export async function POST(req: Request) {
    const data = await req.json();
    const validateUser = registerSchema.safeParse({
        email: data.email,
        username: data.username,
        password: data.password,
        password_confirm: data.password_confirm
    });
    if (!validateUser.success){
        return Response.json({
            email: "Por favor digite um nome de usuário",
            username: "Por favor digite o seu email",
            password: "O campo de senha não pode ser vazio",
            password_confirm: "O campo de confirmação de senha não pode ser vazio"
        }, {status: 400, statusText: "Bad request"});
    }
    const {username, password, email, password_confirm} = validateUser.data;
    const id = uuidv4();

    if (password != password_confirm) {
        return Response.json({password_confirm: "Invalid password"}, {status: 400, statusText: "Bad request"});
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));  
    try {
        await sql`INSERT INTO users (username, email, hash) VALUES (${username}, ${email}, ${hashedPassword})`;
        return Response.json({message: "Register sucessful!"}, {status: 200});

    } catch (error) {
        console.log(error);
        return Response.json({error: "Register failed"}, {status: 400});
    }
}

export async function GET(request: Request){
    try {
        const data = await sql<any[]>`SELECT * FROM users`;
        return Response.json(data);
    } catch(error) {
        Response.json(error);
    }
}