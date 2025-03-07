import { ReactNode } from "react";

export default function CardContainer({children, className}: {children?: ReactNode, className?: string}) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}