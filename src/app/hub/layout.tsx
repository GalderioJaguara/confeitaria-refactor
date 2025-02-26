import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import SideBar from "../components/sidebar/SideBar";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"]
});

export default function Layout({children}: {children: ReactNode}) {
  
    return (
            <div className={`${roboto.className} antialiased`}>
                <SideBar />
                <div>
                  {children}
                </div>    
            </div>  
    );
}