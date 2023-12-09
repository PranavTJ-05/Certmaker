import Navbar from "@/components/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 min-h-screen flex flex-col gap-4">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
