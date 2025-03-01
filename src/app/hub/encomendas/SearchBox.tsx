export default function SearchBox() {
    return (
        <div>
         <div className="w-full flex justify-between items-center px-4">
            <input type="text" name="search" id="search" className="border border-solid rounded-md p-2"/>
            <button className="border border-solid p-2 rounded-md bg-primary-500 text-white hover:bg-primary-300">Cadastrar Cliente</button>
        </div>
        </div>
    );
}