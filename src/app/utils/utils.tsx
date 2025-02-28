import { RevenueData } from "./types";

export default function filterRevenueByYear(data: RevenueData[], date: number) {
        const dataThisYear = data.filter((item) => {
            if (Number(item.month.split("/")[1]) == date) {
                return {month: item.month.split("/")[0], revenue: item.revenue}
            }
        });
        return dataThisYear;
}