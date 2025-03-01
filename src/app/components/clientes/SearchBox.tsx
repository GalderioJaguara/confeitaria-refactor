'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../generics/Button";
import Input from "../register/Input";
import Title from "../generics/Title";
import { Close } from "@mui/icons-material";

interface ClientProps {
    name: string,
    phone: string
}

export default function SearchBox() {
    const [values, setValues] = useState<ClientProps>({name: "", phone: ""});
    const [errors, setErrors] = useState({name: "", phone: "", message: ""});
    const [open, setOpen] = useState(false);

    function openModal() {
        setValues({name: "", phone: ""});
        setOpen(!open);
    }

     async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch("/api/clients", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if(!response.ok) {
            console.log(errors);
            console.log(`${data.name} ${data.phone}}`);
            setErrors({
                name: data.name,
                phone: data.phone,
                message: data.message
            });
            return data;
        }  
        setOpen(false);
        return data;
     }
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setValues((prevValues) => {
            return {
                ...prevValues,
                [name]: value
            }
        });
    }
    
    return (
       <div>
         <div className="w-full flex justify-between items-center px-4">
            <input type="text" name="search" id="search" className="border border-solid rounded-md p-2"/>
            <button onClick={openModal} className="border border-solid p-2 rounded-md bg-primary-500 text-white hover:bg-primary-300">Cadastrar Cliente</button>
        </div>
        {open && (
            <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="w-[450px] h-[450px] bg-white p-8 rounded-md border border-solid border-black/50">
               <div>
                <div className="flex justify-between items-center">
                <Title>Cadastre o usuário</Title>
                <button onClick={() => setOpen(false)}><Close className="hover:text-gray-500 cursor-pointer"/></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input  label="Nome do cliente" type="text" placeholder="ex: João da Silva" name="name" id="name" className="my-2" value={values.name} onChange={handleChange}/>
                    {errors.name != undefined && <p className="text-sm text-red-500">{errors.name}</p>}
                    
                    <Input label="Telefone do cliente" name="phone" placeholder="ex: (55) 99123 4567" id="phone" type="text" value={values.phone} className="my-2" onChange={handleChange}/>

                    {errors.phone != undefined && <p className="text-sm text-red-500">{errors.phone}</p>}
                    <div className="grid grid-cols-2 gap-8 my-4">
                        <Button type="submit">Cadastrar</Button>
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