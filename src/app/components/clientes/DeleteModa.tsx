'use client'

import { Close, Delete } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import Title from "../generics/Title";
import Button from "../generics/Button";
import { deleteClient } from "@/app/data/serverActions";

export default function DeleteModal({id}: {id: string}) {

    const [open, setOpen] =  useState<boolean>(false);

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await deleteClient(id);
        setOpen(false);
    }

    return (
        <div>
            <button onClick={() => setOpen(!open)} title="Excluir"><Delete /></button>
            {open && (
            <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="w-[450px] h-[210px] bg-white p-8 rounded-md border border-solid max-h-screen overflow-hidden border-black/50">
               <div>
                <div className="flex justify-between items-center">
                <Title>Excluir cliente</Title>
                <button onClick={() => setOpen(false)}><Close className="hover:text-gray-500 cursor-pointer"/></button>
                </div>
                    <p>Tem certeza que deseja excluir este cliente?</p>
                <div className="my-5">
                    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <input type="hidden" />
                        <Button type="submit">Excluir</Button>
                        <Button type="button" variant="warning" onClick={() => setOpen(false)}>Fechar</Button>
                    </form>
                </div>
               </div>
            </div>
        </div>
        )}
        </div>
    );
}