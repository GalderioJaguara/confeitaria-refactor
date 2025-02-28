'use client'

export default function SearchBox() {

    function openModal() {
        console.log('funcionando');
    }
    return (
        <div className="w-full flex justify-between items-center px-4">
            <input type="text" name="search" id="search" className="border border-solid rounded-md p-2"/>
            <button onClick={openModal} className="border border-solid p-2 rounded-md bg-primary-500 text-white hover:bg-primary-300">Cadastrar Cliente</button>
        </div>
    );
}