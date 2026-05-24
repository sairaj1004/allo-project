import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Inventory System",
  description: "Inventory Reservation System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#111",
          fontFamily: "Arial",
        }}
      >
        <Navbar />

        {children}
      </body>
    </html>
  );
}