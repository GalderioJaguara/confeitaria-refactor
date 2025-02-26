import { Roboto } from "next/font/google";
import Sidebar from "./SideBar";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400"]
});

export default function Nav() {

    return (
        <div className="bg-primary-500 w-screen h-12 flex items-center px-4">
            <Sidebar />
        </div>
    );
}