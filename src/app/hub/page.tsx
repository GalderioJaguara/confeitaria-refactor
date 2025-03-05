import { Face2, CalendarToday, ShoppingBasket, AttachMoney } from "@mui/icons-material";
import CardSmall from "@/app/components/dashboard/cards/CardSmall";
import CardContent from "../components/dashboard/cards/CardContent";
import Title from "../components/generics/Title";
import { getRevenue, getRevenueLastMonths, getThisMonthOrders, getTotalClients, getTotalOrders } from "../data/fetch";
import CardSmContainer from "../components/dashboard/cards/CardSmContainer";
import CardOrders from "../components/dashboard/cards/CardOrders";
import CardContainer from "../components/dashboard/cards/CardContainer";
import CardRevenue from "../components/dashboard/cards/CardRevenue";
import CardSmTitle from "../components/dashboard/cards/CardSmTitle";



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
        {title: 'Total faturamento mensal', icon: <AttachMoney />, percentage: "(0%)", content: `R$ ${(revenue.sum / 100)}`}
    ];

    

    return(
        <main className="p-4">
            <Title>Painel principal</Title>
            <CardSmContainer>
            {CardItems.map((items, index) => (
                <CardSmall key={index}>
                    <CardSmTitle icon={items.icon}>{items.title}</CardSmTitle>  
                    <CardContent className="py-4 text-gray-400">{items.content}</CardContent>
                </CardSmall>
            ))}
            </CardSmContainer>
            <CardContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardOrders />
        
                <CardRevenue data={revenueLast12Months}/>
            </CardContainer>
        </main>
    );
}