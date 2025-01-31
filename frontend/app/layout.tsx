import type { Metadata } from "next";
import "./globals.css";
//Components
import { TopBar } from "./components/TopBar";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
//QueryClientProvider
import { QueryProvider } from './queryClientProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from "./context/AuthProvider";


export const metadata: Metadata = {
  title: "Shop",
  description: "My Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            <TopBar />
            <Header />
            {children}
            <Footer />
          </AuthProvider>
          <ReactQueryDevtools />
        </QueryProvider>
      </body>
    </html>
  );
}
