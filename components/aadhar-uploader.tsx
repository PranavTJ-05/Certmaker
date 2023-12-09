"use client";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import React, { useEffect } from "react";

const AadharUploader = () => {
  const [anonAadhaar] = useAnonAadhaar();
  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);
  return (
    <div>
      <LogInWithAnonAadhaar />
      {/* <p>{anonAadhaar?.status}</p> */}
    </div>
  );
};

export default AadharUploader;
