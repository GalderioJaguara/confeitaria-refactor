import { ReactNode } from "react";

interface CardTitleProps {
    children?: ReactNode,
    icon?: ReactNode
    className?: string
}

export default function CardSmTitle({children, icon, className}: CardTitleProps) {
    return (
        <div className={`flex justify-between w-ful ${className}`}>
            <h3 className="font-bold text-2xl">{children}</h3>
            <div className="px-4 bg-primary-500 text-white h-[40px] w-[40px] flex items-center justify-center rounded-md">{icon}</div>
        </div>
    );
}