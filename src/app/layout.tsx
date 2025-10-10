import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import FloatingButtons from "./components/FloatingButtons";
import Footer from "./components/Footer";
import ServiceChatbot from "./components/ServiceChatbot";
import QueryProvider from "./components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Confoline Software",
  description: "Confoline.com",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <QueryProvider>
          <Header />
          {children}
          <FloatingButtons />
          {/* Chatbot Widget */}
          <ServiceChatbot />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
