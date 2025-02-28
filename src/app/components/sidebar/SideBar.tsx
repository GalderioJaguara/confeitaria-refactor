'use client';
import { Menu, SpaceDashboard, ShoppingBasket, Face2, AccountBalance, Close, X } from '@mui/icons-material';
import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from 'react-use'
import { Ephesis } from 'next/font/google';
import Link from 'next/link';

const ephesis = Ephesis({subsets: ["latin"], weight: ["400"]});

const listItems = [
    {title: "Painel", icon: <SpaceDashboard />, href: '/hub'},
    {title: "Encomendas", icon: <ShoppingBasket />, href: '/hub/encomendas'},
    {title: "Clientes", icon: <Face2 />, href: '/hub/clientes'},
    {title: "Financeiro", icon: <AccountBalance />, href: '/hub/financeiro'}
]

export default function Sidebar() {
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef(null);
    useClickAway(ref, () => setOpen(!false));

    function openSideMenu() {
        setOpen(!open);
    }

    const framerSidebarBackground = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0, transition:  { delay: 0.2 }},
        transition: {duration: 0.3}
    };

    const framerSidebarPanel = {
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit:{ x: '-100%' },
        transition: {duration: 0.3}
    };

   return(
    <div>
       <button onClick={openSideMenu}>
            <Menu className='text-white text-lg cursor-pointer hover:text-primary-50'/>
       </button>
        <AnimatePresence mode='wait' initial={false}>
        {open && (
        <>
        <motion.div {...framerSidebarBackground} aria-hidden="true" className='fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/10 backdrop-blur-sm'>
        </motion.div>
        <motion.div {...framerSidebarPanel} className='fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 border-primary-400 bg-primary-500' ref={ref} aria-label='SideBar'>
            <div className='p-4'>
                <button onClick={openSideMenu}><Close className='text-white mb-4 hover:text-primary-50'/></button>
                <h1 className={`text-white text-3xl ${ephesis.className}`} >Andreia Teofilo Confeitaria</h1>
            </div>
            <ul className='mx-2'>
                {listItems.map((item, index) => (
                    <li key={index} className='text-white py-4 px-2 my-2 hover:bg-primary-300 cursor-pointer rounded-md'>
                        <Link href={item.href} className='flex gap-2 items-center' onClick={openSideMenu}>
                            <span>{item.icon}</span>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </motion.div>
        </>
       )}
        </AnimatePresence>

    </div>
    ); 
}