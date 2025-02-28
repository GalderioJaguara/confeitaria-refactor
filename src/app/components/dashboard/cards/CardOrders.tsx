import { ReactNode } from "react";
import CardContainer from "./CardContainer";
import CardTitle from "./CardTitle";

interface CardMediumProps {
    children?: ReactNode
    data?: any
}

const OrderItems = [ 
        {name: "Nome Sobrenome", date: "14/4/2025 15:30"},
        {name: "Nome Sobrenome", date: "14/4/2025 15:30"},
        {name: "Nome Sobrenome", date: "14/4/2025 15:30"},
        {name: "Nome Sobrenome", date: "14/4/2025 15:30"},
        {name: "Nome Sobrenome", date: "14/4/2025 15:30"},
    ];

export default function CardOrders ({children, data}: CardMediumProps) {
    return (
        <div className="p-4 space-y-4 border border-gray-200 h-[400px] w-full rounded-lg shadow-sm">
            <CardTitle className="text-xl font-semibold text-gray-900">Últimas Encomendas</CardTitle>
            <CardContainer>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-12 px-4 text-left font-semibold text-lg text-gray-500">
                                    Nome
                                </th>
                                <th className="h-12 px-4 text-left text-lg font-semibold text-gray-500">
                                    Data de entrega
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {OrderItems.map((item, index) => (
                                <tr 
                                    key={index}
                                    className="border-b transition-colors hover:bg-gray-50/50"
                                >
                                    <td className="p-4 align-middle text-gray-400">{item.name}</td>
                                    <td className="p-4 align-middle text-gray-400">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContainer>
        </div>
    );
}