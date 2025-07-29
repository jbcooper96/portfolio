import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";
import Nav from "../components/nav";
import SubHeading from "@/components/subHeading";
import Link from 'next/link'
import ScrollWrapper from "../components/scrollWrapper";


const saira = Saira({
  weight: "400",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "James Cooper",
  description: "My personal site"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${saira.className} antialiased h-dvh overflow-clip`}
      >
        <div className="md:px-24 py-4 md:gap-8 px-4 gap-4 h-dvh flex flex-col overflow-x-clip">
          <h1 className="text-6xl md:text-9xl drop-shadow-md"><Link href="/">James Cooper</Link></h1>
          <SubHeading />
          <Nav/>
          <ScrollWrapper>
            {children}
          </ScrollWrapper>
          </div>
      </body>
    </html>
  );
}
