
export default function Button(props:any) {
    const {children, type, className, variant, onClick} = props;

   return (
    <button onClick={onClick} type={type} className={`${variant == "warning" ? "bg-red-500 hover:bg-red-400" : "bg-primary-500 hover:bg-primary-400 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white ${className}`}>{children}</button>
   );
}

