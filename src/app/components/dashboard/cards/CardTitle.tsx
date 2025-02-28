import { ReactNode } from "react";

export default function CardTitle({children, className}: {children: ReactNode, className?: string}) {
    return(
        <h3 className={`font-bold text-xl ${className}`}>{children}</h3>
    );
}