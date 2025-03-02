import { ChangeEventHandler, ReactNode } from "react";

interface RadioProps {
    name: string;
    id?: string;
    value: string;
    label?: string;
    onChange?: ChangeEventHandler,
    checked?: boolean;
}

export default function Radio(props: RadioProps) {
    const { name, id, value, label, onChange, checked} = props;
    return (
        <div className="flex items-center gap-4 my-4">
            <label htmlFor={id}>{label}</label>
            <input checked={checked} onChange={onChange} type="radio" name={name} id={id} value={value} className="accent-primary-500"/> 
        </div> 
    );
}