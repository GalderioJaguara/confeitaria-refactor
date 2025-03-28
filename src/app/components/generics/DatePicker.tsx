interface DatePicker {
    label?: string;
    name: string;
    id?: string;
    value?: string;
    required?: boolean;
    placeholder?: string;
    onChange?: () => void;
    min?: string;
    defaultValue?: string;
}

export default function DatePicker(props: DatePicker) {

    const {label, name, id, value, onChange, required, placeholder, min, defaultValue} = props;
    return (
        <div className="mb-5">
        <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {label}
        </label>
        <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
            </div>
            <input
                id={id}
                type="datetime-local"
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                defaultValue={defaultValue}
                min={min}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
            />
        </div>
    </div>
    );
} 