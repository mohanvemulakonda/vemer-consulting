import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Vemer Consulting — CRM, BI & Digital Transformation",
  description:
    "Enterprise consulting for Salesforce, Microsoft Dynamics, SAP, DevOps, and Business Intelligence. We architect systems that scale.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} dark`}>
      <body className="bg-[#050505] text-gray-100 font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
