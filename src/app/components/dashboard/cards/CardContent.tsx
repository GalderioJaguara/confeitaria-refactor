import { ReactNode } from "react";

interface CardSmContentProps {
    children?: ReactNode,
    className?: string
}

export default function CardContent({children, className}: CardSmContentProps) {
    return(
        <div className={className}>
            {children}
        </div>
    );
}