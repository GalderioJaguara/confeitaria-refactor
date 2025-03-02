import { ReactNode } from "react";

export default function Option({children, value, selected,disabled}: {children: ReactNode, value?: string, selected?: boolean, disabled?: boolean}){
    return(
        <option disabled={disabled} selected={selected} value={value}>{children}</option>
    );
}