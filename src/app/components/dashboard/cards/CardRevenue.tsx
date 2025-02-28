'use client'
import { LineChart } from "@mui/x-charts";
import { ReactNode, useState } from "react";
import { RevenueData } from "@/app/utils/types";
import filterRevenueByYear from "@/app/utils/utils";
import CardTitle from "./CardTitle";

export default function CardRevenue({children, data}: {children?: ReactNode, data: RevenueData[]}) {
    
        const [selectedYear, setSelectedYear] = useState<number>(2025);
        const dataThisYear = filterRevenueByYear(data, selectedYear);
        
    return(
        <div className="h-[400px] w-full border border-solid p-4">
            <div className="flex justify-between items-center">
                <CardTitle>Faturamento anual</CardTitle>
                <div>
                    <select name="years" id="years" className="p-4 border-b border-solid border-gray-200" onChange={(e) => setSelectedYear(Number(e.target.value))} defaultValue={2025}>
                        <option value="2025" selected className="p-4">2025</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
            </div>
                    <LineChart xAxis={[{
                         data: dataThisYear.map(item => item.month.split("/")[0]),
                         label: "Mês"

                    }]}
                    series={[
                        {
                            data: dataThisYear.map(item => Number(item.revenue)),
                            color: "#6002ee",
                            label: "Faturamento"
                        }
                    ]}
                    width={668}
                    height={320}
                    />
         </div>
    );
}