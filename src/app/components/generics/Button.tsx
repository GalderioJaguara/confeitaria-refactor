
export default function Button(props:any) {
    const {children, type, className, variant} = props;

   return (
    <button type={type} className={`${variant == "warning" ? "bg-red-500 hover:bg-red-400" : "bg-primary-500 hover:bg-primary-400"} text-white px-4 h-[48px] rounded-md  ${className}`}>{children}</button>
   );
}

