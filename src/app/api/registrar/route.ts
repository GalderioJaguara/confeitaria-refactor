import postgres from "postgres";
import z from 'zod';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';


const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

const userSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(1, "Por favor digite um nome de usuário"),
    email: z.string().email('Email inválido'),
    password: z.string().min(1, "O campo de senha não pode ser nulo!")    
});

const registerSchema = userSchema.omit({id: true});

export async function POST(req: Request) {
    const data = await req.formData();
    const validateUser = registerSchema.safeParse({
        email: data.get("email"),
        username: data.get("username"),
        password: data.get("password")
    });
    if (!validateUser.success){
        return Response.json({error: validateUser.error});
    }
    const {username, password, email} = validateUser.data;
    const id = uuidv4();

    bcrypt.hash(password, process.env.SALT_ROUNDS!, async (error: Error | undefined, hashedPassword: string) => {
        if (error){
            console.log(error);
            return error;
        }
        try {
            await sql`INSERT INTO usuarios (id, usuario, email, hash) VALUES (${id}, ${username}, ${email}, ${hashedPassword})`
        } catch (error) {
            console.log(error);
            return error;
        }
    });
    return Response.json({data: "Register sucessful!"});
}