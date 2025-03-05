import Button from "@/app/components/generics/Button";
import Input from "@/app/components/generics/Input";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function Page({params}: {params: {id: string}}) {
    const { id } = await params;

    const res = await fetch(`https://confeitaria-refactor.vercel.app/api/clients/${id}`);
    const client = await res.json();

    async function editClient(data: FormData) {
        'use server'
        const response = await fetch(`https://confeitaria-refactor.vercel.app/api/clients/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: data.get("name"),
                phone: data.get("phone")
            })
        });
        if (!response.ok) {
            return await response.json();
        }
        revalidateTag("update-client");
        redirect("/hub/clientes");
    }

    return (
        <main>
              <main className="p-4 max-w-sm mx-auto min-h-screen">
                        <h2 className="mb-5 text-lg">Editar Cliente</h2>
                        <form className="max-w-sm mx-auto" action={editClient}>
                               <Input name="name" id="name" label="Nome do cliente" defaultValue={client[0].name} required={true} type="text"/>
                               <Input name="phone" id="phone" label="Telefone do cliente" defaultValue={client[0].phone} required={true} type="text"/>
                                <div className="mb-5">
                                </div>
                    
                                <Button type="submit">
                                    Editar Cliente
                                </Button>
                            </form>
                     </main>
        </main>
    );
}