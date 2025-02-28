import { ReactNode } from "react";

export default async function CardSmall({children}: {children?: ReactNode}) {
    return (   
            <div className="border shadow-md w-full min-h-40 rounded-md min-w-xs p-4 text-primary-500">{children}</div>
    );
}