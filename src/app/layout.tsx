import type { Metadata } from "next";
import { Roboto, Ephesis } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"]
});

const ephesis = Ephesis({
  variable: "--font-ephesis",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Andreia Teofilo Confeitaria",
  description: "Applicativo de Gerenciamento Empresarial da Andreia Teofilo confeitaria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />
      </head>
      <body>
         <AppRouterCacheProvider>
         {children}
         </AppRouterCacheProvider>
         <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
