import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative p-6 min-h-screen flex flex-col gap-4">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;
