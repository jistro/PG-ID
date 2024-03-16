import type { Metadata } from 'next';
import { Londrina_Solid } from "next/font/google";
import './globals.css';
import Providers from './providers';
import Login from './page';

const londrina = Londrina_Solid({ subsets: ["latin"], variable: '--font-londrina',
	  weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: 'PG-ID',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
	<html lang="en">
      <body className={londrina.className}>
        <Providers>
			<div className='bg-nouns-blue'>

          {children}
			</div>
        </Providers>
      </body>
	  </html>
  );
}
