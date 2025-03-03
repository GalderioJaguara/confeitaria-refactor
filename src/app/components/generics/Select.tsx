import { ReactNode } from "react";

interface Select {
    name: string;
    id?: string;
    label?: string;
    defaultOption?: string;
    onChange?: () => void;
    children?: ReactNode;
    required?: boolean
}

export default function Select (props: Select){
    const {name, id, label, defaultOption, onChange, required, children} = props;
    return (
        <div className="mb-5">
                <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
                <select onChange={onChange} required={required} id={id} name={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primery-500">
                    <option selected disabled value="">{defaultOption}</option>
                    {children}
                </select>
            </div>
    );
}