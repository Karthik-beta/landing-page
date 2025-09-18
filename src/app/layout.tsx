import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import "./index.css";
import { ThemeProvider } from "next-themes";

const interSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sourceCodeProMono = Source_Code_Pro({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pivotr Technologies | Transforming Enterprises Through Technology",
  description: "Pivotr Technologies Private Limited - Integrated Business Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interSans.variable} ${sourceCodeProMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
