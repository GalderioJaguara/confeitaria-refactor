import Link from "next/link";
import LoginForm from "../components/login/LoginForm";
import { verifySessions } from "../api/utils/session";
import { redirect } from "next/navigation";


export default async function Page(){
   const verifyCookies = await verifySessions();
    if (verifyCookies){
        redirect('/hub');
    }

    return (
       <main className="md:w-screen min-h-screen flex justify-center items-center">
            <div className=" overflow-hidden shadow-md border-solid border-primary-500 border-2 md:w-[450px] md:h-[800px] p-8">
                <h1 className="text-xl font-bold  mb-4">Entre</h1>
                <p className="text-gray-600">Seja bem vindo(a) ao sistema de gestão Andreia Teófilo Confeitaria</p>
                <div className="my-8">
                    <LoginForm />
                    <p className="text-sm text-gray-500 hover:text-gray-400 mt-4"><Link href={'/register'}>Não tem uma conta? cadastre-se</Link></p>
                    <p className="text-sm text-gray-500 hover:text-gray-400 mt-4"><Link href={'/recover'}>Esqueceu a senha?</Link></p>
                </div>
            </div>
       </main>
    );
}