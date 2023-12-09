"use client";
import { useAadharStatus } from "@/store/use-aadhar-status";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import React, { useEffect } from "react";

const AadharUploader = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const { setStatus, status } = useAadharStatus();
  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
    console.log(anonAadhaar);
    if (anonAadhaar.status === "logged-in") {
      setStatus();
    }
  }, [anonAadhaar]);
  return (
    <div>
      <LogInWithAnonAadhaar />
      {/* <p>{anonAadhaar?.status}</p> */}
    </div>
  );
};

export default AadharUploader;
