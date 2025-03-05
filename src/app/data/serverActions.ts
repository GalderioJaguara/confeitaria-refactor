'use server'

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createOrder(formData: FormData) {
    const response =  await fetch("https://confeitaria-refactor.vercel.app/api/orders", {
        method: "POST",
        body: JSON.stringify({
            order_details: formData.get("order_details"),
            price: formData.get("price"),
            status: formData.get("status"),
            created_at: formData.get("created_at"),
            delivery_time: formData.get("delivery_time"),
            client_id: formData.get("client_id")
        }),
    });
    if(!response.ok) {
        return await response.json();
    }

    console.log(await response.json());
    revalidateTag("create-order"); 
    redirect("/hub/encomendas");
}

export async function registerClient(data: FormData) {
    const response = await fetch("https://confeitaria-refactor.vercel.app/api/clients", {
        method: 'POST',
        body: JSON.stringify({
            name: data.get("name"),
            phone: data.get("phone")
        }),  
    });
    if (!response.ok) {
        return await response.json();
    }
    revalidateTag("create-client");
    redirect("/hub/clientes");
    
}

export async function deleteClient(id: string) {
    const response = await fetch(`https://confeitaria-refactor.vercel.app/api/clients/${id}`,{
        method: "DELETE",
    });
    if (!response.ok) {
        return await response.json();
    }
    revalidateTag("delete-client");
    return await response.json();
    
}

export async function deleteOrder(id: string) {
    'use server'
    const response = await fetch(`https://confeitaria-refactor.vercel.app/api/orders/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        return await response.json();
    }
    revalidateTag("delete-order");
    return await response.json();
}

