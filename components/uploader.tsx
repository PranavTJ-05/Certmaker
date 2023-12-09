"use client";
import React, { useEffect, useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
  userName: z.string().min(1, { message: "User Email is required" }),
  uploadedFile: z.string(),
});
function Uploader() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      uploadedFile: "",
    },
  });
  const [user, setUser] = useState("");
  // const [uploadedFile, setUploadedFile] = useState("");
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

      form.setValue(
        "uploadedFile",
        `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Form {...form}>
        <form
          className="flex  flex-1 pt-12 h-full flex-col gap-10"
          onSubmit={form.handleSubmit((data) => console.log(data))}
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter the user email to share him the certificate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                uploadFile(e.target.files!);
              }
            }}
          />

          <button
            className="p-1 text-base bg-blue-500 text-white rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Form>
    </div>
  );
}

export default Uploader;
