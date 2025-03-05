import { Delete, Edit } from "@mui/icons-material";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import DeleteOrderModal from "./DeleteOrderModal";

export default function TableOrders({orders}: {orders?: any[]}) {

    return(
        <div className="mt-4 overflow-x-auto">
                  <div className="relative min-w-[1024] w-full overflow-scroll">
                        <table className="w-full text-left caption-bottom text-sm">
                            <thead>
                                <tr className="border-b transition-colors hover:bg-muted/50">
                                    <th className="h-12 px-4 text-left font-semibold text-lg text-gray-500">Pedido</th>
                                    <th className="h-12 px-4 text-left font-semibold text-lg text-gray-500">Preço</th>
                                    <th className="h-12 px-4 text-left font-semibold text-lg text-gray-500">Nome do cliente</th>
                                    <th className="h-12 px-4 text-left font-semibold text-lg text-gray-500">Status</th>
                                    <th className="h-12 px-4 text-left font-semibold text-lg text-gray-500">Data da encomenda</th>
                                    <th className="h-12 px-4 text-left font-semibold text-lg text-gray-500">Data da entrega</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order, index) => (
                                    <tr key={index} className="border-b transition-colors hover:bg-gray-50/50">
                                        <td className="p-4 align-middle text-gray-400">{order.order_details}</td>
                                        <td className="p-4 align-middle text-gray-400">{(order.price / 100).toLocaleString("pt-br", {style: 'currency', currency: "BRL"})}</td>
                                        <td className="p-4 align-middle text-gray-400">{order.name}</td>
                                        <td className="p-4 align-middle text-gray-400">{order.status}</td>
                                        <td className="p-4 align-middle text-gray-400">{new Date(order.created_at).toLocaleString('en-GB')}</td>
                                        <td className="p-4 align-middle text-gray-400">{new Date(order.delivery_time).toLocaleString('en-GB')}</td>
                                        <td className="p-4 align-middle text-gray-400">
                                            <div className="flex gap-4 items-center">
                                                <Link href={`/hub/encomendas/editar/${order.id}`}><Edit /></Link>
                                                <DeleteOrderModal id={order.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Delete modal */}
                        
                    </div>
        </div>
    );
}