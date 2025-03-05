interface Radio {
    name: string;
    id?: string,
    value?: string;
    onChange?: () => void;
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
}

export default function Radio(props: Radio) {
    const {name, id, label, value, onChange, checked, defaultChecked} = props;
    return (
        <div className="flex items-center mb-4">
            <input defaultChecked={defaultChecked} checked={checked} onChange={onChange} id={id} type="radio" name={name} value={value} className="w-4 h-4 border-primary-300 focus:ring-2 border focus:ring-secondary-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-60" />
            <label htmlFor={id} className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {label}
            </label>
        </div>
    );
}