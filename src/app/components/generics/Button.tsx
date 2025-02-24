export default function Button(props:any) {
    const {children, type, className} = props;
   return (
    <button type={type} className={`bg-primary-500 text-white px-4 h-[48px] rounded-md hover:bg-primary-400 ${className}`}>{children}</button>
   ); 
}