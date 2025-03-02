'use client';

import { Close, Delete } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import Button from "../generics/Button";
import { useRouter } from "next/navigation";

export default function DeleteModal({id}: {id:string}) {
    const router = useRouter();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [value, setValue] = useState(id);
    function deleteModal() {
        setOpenDeleteModal(!openDeleteModal);
    }

   async function deleteClient(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`/api/clients/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if (!response.ok) {
            console.log("Algum erro ocorreu.");
            return data;
        }
        setOpenDeleteModal(false);
        router.push("/hub/clientes");
    }

    return(
        <div>
            <button onClick={deleteModal}><Delete /></button>
            {openDeleteModal && (
                  <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                  <div className="w-[450px] h-[450px] bg-white p-8 rounded-md border border-solid border-black/50">
                      <div className="text-right">
                          <button onClick={deleteModal} className="hover:text-gray-500 cursor-pointer"><Close /></button>
                      </div>
                      <div className="flex flex-col justify-center gap-8 px-4 h-full w-full items-center">
                          <div>
                            <p className="text-base mb-2">Você tem certeza que deseja excluir este cliente?</p>
                            <p className="text-center text-red-500">Isso excluirá todas as suas encomendas.</p>
                          </div>
                          <div className="grid grid-cols-2 gap-8 w-full">
                              <form onSubmit={deleteClient}>
                                <input type="hidden" value={value}/>
                                <Button className="w-full" onClick={deleteClient}>Sim</Button>
                              </form>
                              <Button onClick={deleteModal} variant="warning">Não</Button>
                          </div>
                      </div>
                  </div>
          </div> 
            )}
        </div>
    );
}