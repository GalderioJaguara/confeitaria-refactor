import { ReactNode } from "react";


export default function CardOrdersTitle ({children}: {children?: ReactNode}) {
    return(
        <h3 className="text-lg font-bold ">{children}</h3>
    );
}