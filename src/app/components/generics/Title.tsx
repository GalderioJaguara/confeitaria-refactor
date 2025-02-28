import { ReactNode } from "react";

export default function Title({children}: {children?: ReactNode}) {
    return <h2 className="text-xl font-bold my-4">{children}</h2>
}