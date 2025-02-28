import { ReactNode } from "react";

export default function CardTitle({children}: {children: ReactNode}) {
    return(
        <h3 className="font-bold text-2xl text-primary-500">{children}</h3>
    );
}