import { ReactNode } from "react";


export default function CardSubtitle({children, className}: {children?: ReactNode, className?: string}) {
    return (
        <h4 className={`${className} text-lg text-primary-500`}>{children}</h4>
    );
}