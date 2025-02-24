export default function Input(props:any) {
    const { className, label, type, onChange, name, id, value, title, placeholder, autoComplete } = props;
    return(
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-lg" htmlFor="username">{label}</label>
            <input autoComplete={autoComplete} type={type} name={name} id={id} onChange={onChange} title={title} placeholder={placeholder} className="h-12 rounded-md border-2 border-solid border-primary-500 shadow-md p-4" value={value}/>
        </div>
    );
};