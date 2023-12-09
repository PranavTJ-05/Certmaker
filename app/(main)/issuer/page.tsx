import lighthouse from "@lighthouse-web3/sdk";

import React from "react";

const page = () => {
  const handleUpload = async () => {
    const apiKey = process.env.LIGHTHOUSE_API!;
    const uploadResponse = await lighthouse.upload("/next.svg", apiKey);

    console.log(uploadResponse);
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default page;
