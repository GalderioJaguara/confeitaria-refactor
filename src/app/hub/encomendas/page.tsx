import TableOrders from '@/app/components/encomendas/TableOrders';
import SearchBox from '../../components/encomendas/SearchBox';

export default async function Page(){
    const response = await fetch("https://confeitaria-refactor.vercel.app/api/orders" , {
        next: {
            tags: ['create-order']
        }
    });

    const orders = await response.json();
    return (
        <main className='p-4'>
           <h1 className="px-4 text-bold text-xl mb-8">Encomendas</h1>
           <SearchBox />
           <TableOrders orders={orders} />
        </main>
    );
}