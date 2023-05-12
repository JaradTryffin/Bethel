import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bethel",
  description: "Church Management App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = "Jarad";
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
