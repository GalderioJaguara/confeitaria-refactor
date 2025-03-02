import { GET } from '@/app/api/orders/route';
import TableOrders from '@/app/components/encomendas/TableOrders';
import SearchBox from '../../components/encomendas/SearchBox';
import { getClientIds } from '@/app/data/fetch';

export default async function Page(){
    const response = await GET();
    const clients = await getClientIds();
    const orders = await response.json();
    return (
        <main className='p-4'>
           <h1 className="px-4 text-bold text-xl mb-8">Encomendas</h1>
           <SearchBox clients={clients} orders={orders}/>
           <TableOrders orders={orders} />
        </main>
    );
}