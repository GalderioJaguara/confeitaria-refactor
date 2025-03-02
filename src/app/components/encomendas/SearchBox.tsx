'use client'
import { ChangeEvent, FormEvent, useState } from "react";
import Title from "../generics/Title";
import Option from "../generics/Option";
import Input from "../register/Input";
import Radio from "../generics/Radio";
import DatePicker from "../generics/DatePicker";
import ClientBox from "./ClientBox";
import Button from "../generics/Button";
import { useRouter } from "next/navigation";
import { Close } from "@mui/icons-material";


interface Orders {
    order_details: string;
    price: string;
    status: 'Entregue' | 'Nao Entregue';
    created_at: string;
    delivery_time: string;
    client_id: string;
}
    export default function SearchBox({orders, clients}: {orders: any[], clients: any[]}) {
    const router = useRouter();
        const [open, setOpen] = useState<boolean>(false);
       const [values, setValues] = useState<Orders>({order_details: "", price: "", status: "Nao Entregue", created_at: "", delivery_time: "", client_id: ""});
       const [errors, setErrors] = useState({order_details: "", price: "", status: "", created_at: "", delivery_time: "", client_id: "", message: ""});
   
       function handleChange(e: ChangeEvent<HTMLInputElement>) {
           const { name, value } = e.target;
           
           setValues((prevValues) => ({
               ...prevValues,
               [name]: value
           }));
       }
   
       async function handleSubmit(e: FormEvent<HTMLFormElement>) {
           e.preventDefault();
           const response = await fetch("/api/orders", {
               method: "POST",
               body: JSON.stringify(values),
               headers: {
                   'Content-Type': 'application/json'
               }
           });
           const data = await response.json();
           if (!response.ok) {
               setErrors({order_details: data.order_details,
                   price: data.price,
                   status: data.status, 
                   created_at: data.created_at, 
                   delivery_time: data.delivery_time, 
                   client_id: data.client_id, 
                   message: data.message
               });
               return data;
           }
           setOpen(false);
           router.push("/hub/encomendas");
       }
      function handleClick () {
        setOpen(!open);
        setValues({order_details: "", price: "", status: "Nao Entregue", created_at: "", delivery_time: "", client_id: ""});
        setErrors({order_details: "", price: "", status: "", created_at: "", delivery_time: "", client_id: "", message: ""});
      }

    return (
        <div>
         <div className="w-full flex justify-between items-center px-4">
            <input type="text" name="search" id="search" className="border border-solid rounded-md p-2 w-[140px] md:w-[190px]"/>
            <button onClick={handleClick} className="border border-solid p-2 rounded-md bg-primary-500 text-white hover:bg-primary-300">Criar Encomenda</button>
        </div>
                     {open && (
                                <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                                <div className="max-w-[600px] w-full bg-white p-8 rounded-md border border-solid max-h-screen overflow-auto border-black/50">
                                   <div className="max-w-xl p-4">
                                       <div className="flex justify-between items-center">
                                       <Title>Criar Encomenda</Title>
                                        <button onClick={() => setOpen(!open)}><Close /></button>
                                       </div>
                                       <form onSubmit={handleSubmit}>
                                           <Input value={values.order_details} onChange={handleChange} label="Detalhes da encomenda" type="text" placeholder="ex: Bolo ninho 1kg" name="order_details" id="order_details" className="my-2"/>
                                           {errors.order_details != undefined && <p className="text-sm text-red-500">{errors.order_details}</p>}
                                           
                                           <Input value={values.price} onChange={handleChange} label="Preço" name="price" placeholder="R$" id="price" type="text" className="my-2"/>
                                           {errors.price != undefined && <p className="text-sm text-red-500">{errors.price}</p>}
                                   
                                           <div className="my-4 ">
                                               <h4 className="font-semibold">Status</h4>
                                               <div className="flex gap-8 items-center">
                                                   <Radio checked={values.status === "Nao Entregue"} onChange={handleChange} name="status" label="Não Entregue" value="Nao Entregue"/>
                                                   <Radio checked={values.status === "Entregue"} onChange={handleChange} name="status" label="Entregue" value="Entregue" />
                                               </div>
                                           </div>
                                           {errors.status != undefined && <p className="text-xs text-red-500">{errors.status}</p>}
                                           
                                           <DatePicker value={values.created_at} onChange={handleChange} label="Data do pedido" name="created_at"/>
                                           {errors.created_at != undefined && <p className="text-xs text-red-500">{errors.created_at}</p>}
                                   
                                           <DatePicker value={values.delivery_time} onChange={handleChange} label="Data de entrega" name="delivery_time" />
                                           {errors.created_at != undefined && <p className="text-xs text-red-500">{errors.created_at}</p>}
                                   
                                           <ClientBox name="client_id" value={values.client_id} onChange={handleChange} label="Clientes">
                                           <Option value="" disabled={true} selected={true}>Selecione um Cliente</Option>
                                               {
                                                   clients.map((client, index) => (
                                                       <Option key={index} value={client.id}>{client.name}</Option>
                                                   ))
                                               }
                                           </ClientBox>
                                           {errors.client_id != undefined && <p className="text-xs text-red-500">{errors.client_id}</p>}
                                   
                                           <div className="grid grid-cols-2 gap-8 my-4">
                                               <Button type="submit">Cadastrar</Button>
                                               <Button onClick={handleClick} variant="warning" type="button">Cancelar</Button>
                                           </div>
                                           {errors.message != undefined && <p className="text-xs text-red-500">{errors.message}</p>}
                                       </form>
                                   
                                      </div>
                                </div>
                            </div>
                            )}
        </div>
    );
}