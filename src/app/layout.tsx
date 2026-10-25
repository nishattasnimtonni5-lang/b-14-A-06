import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import PlanProvider from "./context/PlanContext";
import { ToastContainer } from "react-toastify";



const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "Build today's workout plan, save favorite lifts for later, and track total duration and calories burned.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
<html
  lang="en"
  className={`${oswald.variable} h-full antialiased`}
>
      <body className="min-h-full flex flex-col">
      <PlanProvider>
       <NavBar/>
        <div className="flex-1">
        
        {children}</div>
        <Footer/>
       </PlanProvider> 
       <ToastContainer/>
       </body>
    </html>
  );
}
