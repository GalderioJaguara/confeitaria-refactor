import { ReactNode } from "react";

interface CardMediumProps {
    children?: ReactNode
}

export default function CardOrders ({children}: CardMediumProps) {
    return (
        <div className="p-4 border border-gray-200 border-solid max-w-lg h-[400px] w-full border-primary-black shadow-md rounded-md">
            {children}
        </div>
    );
}