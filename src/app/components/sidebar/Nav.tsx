import MenuClose from "./MenuClose";
import NavLink from "./NavLink";
import { Ephesis } from "next/font/google";

export const ephesis = Ephesis({
  subsets: ["latin"],
  weight: ["400"]
});


export default function Nav(props: any) {
    const {className, closeModal} = props;
    return (
    <div className={`fixed flex flex-col justify-between w-[300px] bg-primary-500 h-screen ${className}`}>
        <div>
            <div>
                <div className="p-4">
                    <MenuClose onClick={() => closeModal(false)}/>
                </div>
                <h1 className={`${ephesis.className} px-6 my-4 antialiased text-white text-3xl break-words`}>Andreia Teofilo Confeitaria</h1>    
            </div>
            <div className="overflow-hidden">
                <ul className="px-4">
                    <NavLink onClick={() => closeModal(false)} href="/hub">Painel</NavLink>
                    <NavLink onClick={() => closeModal(false)} href="/hub/orders">Encomendas</NavLink>
                    <NavLink onClick={() => closeModal(false)} href="/hub/clients">Clientes</NavLink>
                    <NavLink onClick={() => closeModal(false)} href="/hub/finance">Financeiro</NavLink>
                </ul>
                
            </div>
        </div>
        <div className="px-4 my-4">
            <NavLink onClick={() => closeModal(false)} href="/logout">Sair</NavLink>
        </div>
 </div>
);
}