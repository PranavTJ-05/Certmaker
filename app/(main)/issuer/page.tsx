"use client";
import React from "react";
import lighthouse from "@lighthouse-web3/sdk";

function Page() {
  const progressCallback = (progressData: number) => {
    let percentageDone: number =
      //@ts-ignore
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (file: any) => {
    console.log(file);

    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    if (file) {
      // @ts-ignore
      const output = await lighthouse.upload(
        file,
        process.env.NEXT_PUBLIC_LIGHTHOUSE_API!,
        false,
        undefined,
        progressCallback
      );
      console.log("File Status:", output);
      /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

      console.log(
        "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
      );
    }
  };

  return (
    <div className="App">
      <input
        onChange={(e) => {
          if (e.target.files) {
            uploadFile(e.target.files!);
          }
        }}
        type="file"
      />
    </div>
  );
}

export default Page;
