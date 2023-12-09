"use client";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import React from "react";
import "../app/globals.css";
const appId = process.env.NEXT_PUBLIC_APP_ID || "";
const AadharProvider = ({ children }: { children: React.ReactNode }) => {
  return <AnonAadhaarProvider _appId={appId}>{children}</AnonAadhaarProvider>;
};

export default AadharProvider;
