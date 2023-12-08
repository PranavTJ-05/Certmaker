import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Modal } from "@/context/walletConfig";
import type { AppProps } from "next/app";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const inter = Inter({ subsets: ["latin"] });
const appId = process.env.NEXT_PUBLIC_APP_ID || "";

export const metadata: Metadata = {
  title: "DeCert",
  description: "This is a marketplace to upload the models",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AnonAadhaarProvider _appId={appId}> */}
        <Web3Modal>{children}</Web3Modal>
        {/* </AnonAadhaarProvider> */}
      </body>
    </html>
  );
}
