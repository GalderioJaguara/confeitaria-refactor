import SearchBox from "@/app/components/clientes/SearchBox";
import TableClients from "@/app/components/clientes/TableClients";
import { GET } from '@/app/api/clients/route';

export default async function Page() {
    const response = await GET();
    const clients = await response.json();
    
    return (
        <main className="p-4">
            <h1 className="px-4 text-bold text-xl mb-8">Clientes</h1>
            <SearchBox />
            {/* Tabela clientes */}
            <TableClients data={clients}/>
        </main>
    );
}