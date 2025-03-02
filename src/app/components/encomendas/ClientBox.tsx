import { ChangeEventHandler, ReactNode } from "react";

interface ClientBoxProps {
    name?: string;
    id?: string;
    label?: string;
    onChange?: ChangeEventHandler;
    children?: ReactNode;
    value?: string;
    defaultValue?: string
}

export default function ClientBox(props: ClientBoxProps) {
    const {children, label, id, name, onChange, value, defaultValue} = props;
    return (
       <div className="flex flex-col justify-center gap-2 my-2">
        <label htmlFor={id}>{label}</label>
        <select defaultValue={defaultValue} value={value} onChange={onChange} className="max-w-[240px] text-sm border-2 border-solid border-primary-500 rounded-md px-4 py-2" name={name} id={id}>
            {children}
        </select>
       </div>
    );
}