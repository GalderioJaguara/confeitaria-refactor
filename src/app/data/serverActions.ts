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
        return;
    }

    console.log(await response.json());
    revalidateTag("create-order"); 
    redirect("/hub/encomendas");
}