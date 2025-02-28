import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

export async function getTotalClients() {
    try {
        const total = await sql`SELECT COUNT(*) FROM clients`;
        return total[0];
    } catch (error) {
        throw new Error ("Failed to fetch number of clients");
    }
}

export async function getTotalOrders () {
    try {
        const total = await sql`SELECT COUNT (*) FROM orders`;
        return total[0];
    } catch (error) {
        throw new Error("Failed do fetch total amount of orders");
    }
}

export async function getRevenue() {
    try {
        const revenue = await sql`SELECT SUM(price) FROM orders`;
        return revenue[0];
    } catch (error){
        throw new Error ("Failed to fetch the total revenue");
    }
}

export async function getThisMonthOrders () {
    try {
        const orders = await sql `SELECT COUNT(*) FROM orders WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE) AND created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'`;
        return orders[0];
    } catch (error) {
        throw new Error ("Failed to fetch the amount orders of this month");
    }
} 

export async function getRevenueLastMonths() {
    try {
        const data = await sql`SELECT 
    DATE_TRUNC('month', created_at) AS mes,
    SUM(price) AS total
    FROM orders
    WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months'
    GROUP BY mes
    ORDER BY mes`;
        const dataFormatted = data.map((data) => {
            const month = new Date(data.mes).getMonth();
            const year = new Date(data.mes).getFullYear();
          return {month: `${month + 1}/${year}`, revenue: data.total};
        });

    return dataFormatted;
    } catch (error) {
        throw new Error("Failed to get last 12 months revenue");
    }
}