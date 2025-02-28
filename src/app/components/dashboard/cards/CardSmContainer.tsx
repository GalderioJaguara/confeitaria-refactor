import { ReactNode } from "react";

interface CardSmContainerProps {
    children?: ReactNode
}

export default function CardSmContainer({children}: CardSmContainerProps){
    return(
        <div className="grid xl:grid-cols-4 my-4 gap-8 grid-cols-1 sm:grid-cols-2 w-full">
            {children}
        </div>
    );
}