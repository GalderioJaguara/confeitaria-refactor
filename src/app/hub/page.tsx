import { Face2, CalendarToday, ShoppingBasket, AttachMoney } from "@mui/icons-material";
import CardSmall from "@/app/components/dashboard/cards/CardSmall";
import CardContent from "../components/dashboard/cards/CardContent";
import Title from "../components/generics/Title";
import { getRevenue, getRevenueLastMonths, getThisMonthOrders, getTotalClients, getTotalOrders } from "../data/fetch";
import CardSmContainer from "../components/dashboard/cards/CardSmContainer";
import CardOrders from "../components/dashboard/cards/CardOrders";
import CardContainer from "../components/dashboard/cards/CardContainer";
import CardSubtitle from "../components/dashboard/cards/CardSubtitle";
import CardRevenue from "../components/dashboard/cards/CardRevenue";
import { LineChart } from '@mui/x-charts/LineChart'
import CardSmTitle from "../components/dashboard/cards/CardSmTitle";
import CardTitle from "../components/dashboard/cards/CardTitle";



export default async function Page() {
    const clients = await getTotalClients();
    const ordersTotal = await getTotalOrders();
    const monthOrders = await getThisMonthOrders();
    const revenue = await getRevenue();
    const revenueLast12Months = await getRevenueLastMonths();

    const CardItems = [
        {title: 'Total Clientes', icon: <Face2 />, percentage: '(10%)', content: clients.count},
        {title: 'Encomendas do mes', icon: <CalendarToday />, percentage: '(-30%)', content: monthOrders.count},
        {title: 'Total de encomendas', icon: <ShoppingBasket />, percentage: '(+5%)', content: ordersTotal.count},
        {title: 'Total faturamento mensal', icon: <AttachMoney />, percentage: "(0%)", content: revenue.sum}
    ];

    const OrderItems = [ 
        {name: "Nome Sobrenome", date: "14/4/2025 15:30"},
        {name: "Nome Sobrenome", date: "14/4/2025 15:30"},
        {name: "Nome Sobrenome", date: "14/4/2025 15:30"},
        {name: "Nome Sobrenome", date: "14/4/2025 15:30"},
        {name: "Nome Sobrenome", date: "14/4/2025 15:30"},
    ];

    return(
        <div className="p-4">
            <Title>Clientes</Title>
            <CardSmContainer>
            {CardItems.map((items, index) => (
                <CardSmall key={index}>
                    <CardSmTitle icon={items.icon}>{items.title}</CardSmTitle>  
                    <CardContent className="text-xl py-4 text-primary-500">{items.content}</CardContent>
                    <CardContent className="text-secondary-800">{items.percentage}</CardContent>
                </CardSmall>
            ))}
            </CardSmContainer>
            <CardContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardOrders>
                    <CardTitle>Últimas Encomendas</CardTitle>
                    <CardContainer className="mt-4 mb-8">
                        <CardContainer className="flex gap-4 text-lg border-b justify-between">
                            <CardSubtitle>Nome do Cliente</CardSubtitle>
                            <CardSubtitle>Data de Entrega</CardSubtitle>
                        </CardContainer>
                        {OrderItems.map((item, index) => (
                            <CardContainer className="mt-4 flex gap-8 text-lg border-b justify-between" key={index}>
                                <CardContent className="text-primary-300">{item.name}</CardContent>
                                <CardContent className="text-primary-300">{item.date}</CardContent>
                            </CardContainer>
                        ))}
                    </CardContainer>
                </CardOrders>
                <CardRevenue data={revenueLast12Months}/>
            </CardContainer>
        </div>
    );
}