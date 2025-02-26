import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
    href: string, 
    children: ReactNode,
    onClick: ()=> void
}

export default function NavLink(props: NavLinkProps) {
    const {href, children, onClick} = props;
    return (
        <li className="list-none py-2 hover:bg-primary-300 cursor-pointer rounded-md text-white px-2">
            <Link onClick={onClick} href={href} className="block w-full">{children}</Link>
        </li>
    );
}