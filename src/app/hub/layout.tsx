import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import Nav from "../components/sidebar/Nav";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"]
});

export default function Layout({children}: {children: ReactNode}) {
  
    return (
            <div className={`${roboto.className} antialiased`}>
                <Nav />
                <div>
                  {children}
                </div>    
            </div>  
    );
}