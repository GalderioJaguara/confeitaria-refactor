import { getClientIds } from "@/app/data/fetch";
import createOrder from "@/app/data/serverActions";


export default async function FormOrderCreate() {
    const clients = await getClientIds(); 

    return (
        <form className="max-w-sm mx-auto" action={createOrder}>
            <div className="mb-5">
                <label htmlFor="order_details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pedido</label>
                <input type="text" id="order_details" name="order_details" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="pedido" required />
            </div>
            <div className="mb-5">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preço</label>
                <input type="text" id="price" name="price" placeholder="R$" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
            </div>
            <div className="mb-5">
            </div>
            <fieldset>
                <legend className="sr-only">Status</legend>

                <div className="flex items-center mb-4">
                    <input id="nao-entregue" type="radio" name="status" value="Nao Entregue" className="w-4 h-4 border-primary-300 border focus:ring-2 focus:ring-secondary-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="nao-entregue" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                    Não entregue
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input id="entregue" type="radio" name="status" value="Entregue" className="w-4 h-4 border-primary-300 focus:ring-2 border focus:ring-secondary-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-60" />
                    <label htmlFor="entregue" className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Entregue
                    </label>
                </div>

            </fieldset>
            <div className="mb-5">
                <label
                    htmlFor="created_at"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Data da encomenda
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
                        id="created_at"
                        type="datetime-local"
                        name="created_at"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                    />
                </div>
            </div>

            <div className="mb-5">
                <label
                    htmlFor="delivery_time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Data da entregaa
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
                        id="delivery_time"
                        type="datetime-local"
                        name="delivery_time"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                    />
                </div>
            </div>

            <div className="mb-5">
            <label htmlFor="clients" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                    <select id="clients" name="client_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a country</option>
                        {clients.map((client, index) => (
                            <option key={index} value={client.id}>{client.name}</option>
                        ))}
                    </select>
            </div>

            <button type="submit" className="text-white bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Criar Encomenda</button>
        </form>
    );
}