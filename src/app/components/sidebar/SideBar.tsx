'use client';
import { Ephesis, Roboto } from "next/font/google";
import Nav from "./Nav";
import { useState } from "react";
import MenuMobile from "./MenuMobile";
import clsx from "clsx";

export const ephesis = Ephesis({
  subsets: ["latin"],
  weight: ["400"]
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400"]
});

export default function SideBar() {
    const [open, setOpen] = useState<boolean>(false);
    function handleClick() {
        
        setOpen(!open);
    }

    return (
       <div className={clsx({"inset-0 bg-black/50 w-screen h-screen": open == true})}>
        <div className={`bg-primary-500 w-screen h-12 px-4 flex items-center`}>
            <MenuMobile onClick={handleClick} />
        </div>
        <div className={` `}>
            <Nav closeModal={setOpen} className={clsx("left-[-300] top-0 ease-in-out durarion-300 transition", {
                "translate-x-full": open == true,
                "translate-x-0": open == false
            })}/>
        </div>    
           
       </div>
    );
}