import { Delete, Edit } from "@mui/icons-material";
import Link from "next/link";
import DeleteModal from "./DeleteModa";

export default function TableClients({data}: {data?: any[]}) {
    
    return (
        <div className="relative w-full overflow-auto">
            <table className="w-full text-left caption-bottom text-sm">
                <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left font-semibold text-lg text-gray-500">Nome</th>
                        <th className="h-12 px-4 text-left font-semibold text-lg text-gray-500">Numero de Telefone</th>
                        <th className="h-12 px-4 text-left font-semibold text-lg text-gray-500">Operações</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((client, index) => (
                        <tr key={index} className="border-b transition-colors hover:bg-gray-50/50">
                            <td className="p-4 align-middle text-gray-400">{client.name}</td>
                            <td className="p-4 align-middle text-gray-400">{client.phone}</td>
                            <td className="p-4 align-middle text-gray-400">
                                <div className="flex gap-4 items-center">
                                    <Link href={`/hub/clientes/editar/${client.id}`}><Edit /></Link>
                                    <DeleteModal id={client.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Delete modal */}
            
        </div>
    );
}