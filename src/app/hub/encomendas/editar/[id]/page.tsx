import Button from "@/app/components/generics/Button";
import DatePicker from "@/app/components/generics/DatePicker";
import Input from "@/app/components/generics/Input";
import Option from "@/app/components/generics/Option";
import Radio from "@/app/components/generics/Radio";
import RadioGroup from "@/app/components/generics/RadioGroup";
import Select from "@/app/components/generics/Select";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";




export default async function Page({params}: {params: {id: string}}) {
    const { id } = await params;
    const response = await fetch(`https://confeitaria-refactor.vercel.app/api/orders/${id}`);
    const order = await response.json();
    const respClient = await fetch(`https://confeitaria-refactor.vercel.app/api/clients/${order[0].client_id}`);
    const client = await respClient.json()

    async function updateOrder(formData: FormData) {
        'use server'
        const response = await fetch(`https://confeitaria-refactor.vercel.app/api/orders/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                order_details: formData.get('order_details'),
                price: formData.get('price'),
                status: formData.get('status'),
                created_at: formData.get('created_at'),
                delivery_time: formData.get('delivery_time'),
                client_id: formData.get('client_id')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return (
        <main className="p-4">
            <form className="max-w-sm mx-auto" action={updateOrder}>
                       <Input defaultValue={order[0].order_details} name="order_details" id="order_details" label="Pedido" required={true} type="text"/>
                       <Input defaultValue={order[0].price} name="price" id="price" label="Preço" required={true} type="text"/>
                        <div className="mb-5">
                        </div>
            
                       <RadioGroup legend="Status">
                            <Radio defaultChecked={order[0].status === 'Nao Entregue' && true} name="status" id="status-1" value="Nao Entregue" label="Não Entregue"/>
                            <Radio defaultChecked={order[0].status == 'Entregue' && true}
                             name="status" id="status-2" value="Entregue" label="Entregue"/>
                       </RadioGroup>
            
                        {/* Replaced default date input with a custom DatePicker */}
                        <DatePicker
                            id="created_at"
                            name="created_at"
                            label="Data da encomenda"
                            defaultValue={order[0].created_at.slice(0,16)}
                            placeholder="Selecione uma data"
                        />
            
                        <DatePicker
                            id="delivery_time"
                            name="delivery_time"
                            defaultValue={order[0].delivery_time.slice(0,16)}
                            label="Data da entregaa"
                            placeholder="Selecione uma data"
                        />

                        <Select defaultValue={client[0].id} name="client_id" id="client_id" label="Selecione um Cliente" required={true}>
                            <Option value={client[0].id}>{client[0].name}</Option>
                        </Select>
                
                        <Button type="submit">
                            Criar Encomenda
                        </Button>
                    </form>
        </main>
    );
}