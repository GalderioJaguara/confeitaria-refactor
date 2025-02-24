import dotenv from 'dotenv';
import postgres from "postgres";
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
dotenv.config();

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

const userSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(1, "Por favor digite um nome de usuário"),
    email: z.string().email('Email inválido'),
    password: z.string().min(1, "O campo de senha não pode ser nulo!")    
});

const loginSchema = userSchema.omit({id: true, username: true});

export async function POST(req: Request){
    const data = await req.json();
    const validateLoginCredentials = loginSchema.safeParse({
        email: data.email,
        password: data.password
    });
    if (!validateLoginCredentials.success){
        const errorMessage = {email: "", password: ""};
        validateLoginCredentials.error.issues.map((err) => {
            if (err.path[0] == "email") {
                errorMessage.email = err.message;
            }
            if (err.path[0] == "password") {
                errorMessage.password = err.message;
            }
        });
        return Response.json(errorMessage, {status: 400, statusText: "Bad Request"});
    }
    const {email, password} = validateLoginCredentials.data;
    try {
        const userData = await sql`SELECT * FROM users WHERE email = ${email}`;
        if(userData[0] == null){
            return Response.json({email: "Este email não está cadastrado"} , {status: 400, statusText: "Bad request"});
        }
        const comparePasswords = await bcrypt.compare(password, userData[0].hash);
        if (!comparePasswords) {
            return Response.json({password: "Senha incorreta! Tente novamente"}, {status: 400, statusText: "Bad request"});
        }
        return Response.json({}, {status: 200 , statusText: "Ok"});
    } catch (error) {
       return Response.json({error: error, message: "Failed to login"}, {status: 400, statusText: "Bad request"});
    }
}

export async function GET(){
    redirect("/login");
}