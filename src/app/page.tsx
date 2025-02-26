import Image from "next/image";
import { verifySessions } from "./api/utils/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const verifyCookies = await verifySessions();
  if (!verifyCookies) {
    redirect('/login');
  } else {
    redirect("/hub");
}
}
