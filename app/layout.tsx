import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Agnos Assignment",
  description: "Patient & Staff real-time management system",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
