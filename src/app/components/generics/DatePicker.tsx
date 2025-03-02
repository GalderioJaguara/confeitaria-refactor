import { ChangeEventHandler } from "react";

interface DatePickerProps{
    name?: string;
    id?: string;
    value?: string;
    label?: string;
    onChange?: ChangeEventHandler;
}

export default function DatePicker(props: DatePickerProps) {
    const {name, id, value, label, onChange} = props;
    return(
        <div className="flex flex-col gap-2 my-4">
            <label htmlFor={name}>{label}</label>
            <input onChange={onChange} type="datetime-local" name={name} id={id} value={value} className="max-w-[170px] text-sm border-2 border-solid border-primary-500 rounded-md px-2 py-2" />
        </div>
    );
}