interface Input {
    label?: string;
    type?: string;
    id?: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    onChange?: () => void;
    value?: string;
    defaultValue?: string;
}



export default function Input(props: Input) {
    const {label, type, id, name, placeholder, required, onChange, value, defaultValue} = props;

    return(
        <div className="mb-5">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type} defaultValue={defaultValue} value={value} id={id} name={name}className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder={placeholder} required={required} onChange={onChange}/>
        </div>
    );
}