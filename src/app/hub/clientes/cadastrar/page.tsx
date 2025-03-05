import Button from "@/app/components/generics/Button";
import Input from "@/app/components/generics/Input";
import { registerClient } from "@/app/data/serverActions";

export default function Page() {

    
    return (
         <main className="p-4 max-w-sm mx-auto min-h-screen">
            <h2 className="mb-5 text-lg">Cadastrar Cliente</h2>
            <form className="max-w-sm mx-auto" action={registerClient}>
                   <Input name="name" id="name" label="Nome do cliente" required={true} type="text"/>
                   <Input name="phone" id="phone" label="Telefone do cliente" required={true} type="text"/>
                    <div className="mb-5">
                    </div>
        
                    <Button type="submit">
                        Register Cliente
                    </Button>
                </form>
         </main>
    );
}