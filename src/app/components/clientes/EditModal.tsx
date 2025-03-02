'use client';
import { Close, Edit } from "@mui/icons-material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Title from "../generics/Title";
import Input from "../register/Input";
import Button from "../generics/Button";
import { useRouter } from "next/navigation";

interface ClientProps {
    id: string,
    name: string,
    phone: string
}

export default function EditModal({client}: {client: ClientProps}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({name: "", phone: "", message: ""});
    const [values, setValues] = useState({name: client.name, phone: client.phone
    });

    function openModal() {
        setOpen(!open);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setValues((prevValues) => {
            return {
                ...prevValues,
                [name]: value
            };
        });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const response = await fetch(`/api/clients/${client.id}`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if(!response.ok) {
            console.log("Algo de errado ao enviar a request");
            setErrors({
                name: data.name,
                phone: data.phone,
                message: data.message
            });
            return data;
        }
        setOpen(false);
        router.push("/hub/clientes");
    }

    

    return(
        <div>
            <button onClick={openModal}><Edit /></button>
             {open && (
                        <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                        <div className="w-[450px] h-[450px] max-h-screen overflow-scroll bg-white p-8 rounded-md border border-solid border-black/50">
                           <div>
                            <div className="flex justify-between items-center">
                            <Title>Editar dados do usuário</Title>
                            <button onClick={() => setOpen(false)}><Close className="hover:text-gray-500 cursor-pointer"/></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <Input  label="Nome do cliente" type="text" placeholder="ex: João da Silva" name="name" id="name" className="my-2" value={values.name} onChange={handleChange}/>
                                {errors.name != undefined && <p className="text-sm text-red-500">{errors.name}</p>}
                                
                                <Input label="Telefone do cliente" name="phone" placeholder="ex: (55) 99123 4567" id="phone" type="text" value={values.phone} className="my-2" onChange={handleChange}/>
            
                                {errors.phone != undefined && <p className="text-sm text-red-500">{errors.phone}</p>}
                                <div className="grid grid-cols-2 gap-8 my-4">
                                    <Button type="submit">Concluir</Button>
                                    <Button variant="warning" type="button" onClick={() => {setValues({name: "", phone: ""}); setOpen(false)}}>Cancelar</Button>
                                </div>
                                {errors.message != undefined && <p className="text-sm text-red-500">{errors.message}</p>}
                            </form>
            
                           </div>
                        </div>
                    </div>
                    )}
        </div>
    );
}