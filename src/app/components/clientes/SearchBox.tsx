'use client'

import { useState } from "react";
import Button from "../generics/Button";
import Input from "../register/Input";
import Title from "../generics/Title";

export default function SearchBox() {
    const [open, setOpen] = useState(false);

    function openModal() {
        setOpen(!open);
    }
    
    return (
       <div>
         <div className="w-full flex justify-between items-center px-4">
            <input type="text" name="search" id="search" className="border border-solid rounded-md p-2"/>
            <button onClick={openModal} className="border border-solid p-2 rounded-md bg-primary-500 text-white hover:bg-primary-300">Cadastrar Cliente</button>
        </div>
        <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="w-[450px] h-[500px] bg-white p-8 rounded-md">
               <div>
                <Title>Cadastre o usuário</Title>
                <form>
                    <Input label="Nome do cliente" type="text" placeholder="ex: João da Silva" name="name" id="name" className="my-4"/>
                    <Input label="Telefone do cliente" name="phone" placeholder="ex: (55) 99123 4567" id="phone" type="text" className="mx=4"/>
                    <div className="grid grid-cols-2 gap-8 my-8">
                        <Button>Cadastrar</Button>
                        <Button variant="warning">Cancelar</Button>
                    </div>
                </form>

               </div>
            </div>
        </div>
       </div>
    );
}