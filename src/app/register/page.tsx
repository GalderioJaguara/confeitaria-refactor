import Link from "next/link";
import RegisterForm from "../components/register/RegisterForm";

export default function Page(){
    return (
       <main className="md:w-screen min-h-screen flex justify-center items-center ">
            <div className=" overflow-hidden shadow-md border-solid border-primary-500 border-2 max-w-[450px] md:h-[800px] p-8">
                <h1 className="text-xl font-bold  mb-4">Cadastre-se</h1>
                <p className="text-gray-600">Seja bem vindo(a) ao sistema de gestão Andreia Teófilo Confeitaria, caso não tenha uma conta cadastre-se</p>
                <div className="my-2">
                    <RegisterForm />
                    <p className="text-sm text-gray-500 hover:text-gray-400 mt-4"><Link href={'/login'}>Ja é cadastrado? Entre</Link></p>
                </div>
            </div>
       </main>
    );
}