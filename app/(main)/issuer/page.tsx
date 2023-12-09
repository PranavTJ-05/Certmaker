"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AadharUploader from "@/components/aadhar-uploader";
import { useAccount, useContractRead } from "wagmi";
import { abi, contractAddress } from "@/lib/contractUtils";
import Uploader from "@/components/uploader";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
});
const Issuer = () => {
  const { address } = useAccount();
  const [userName, setUserName] = useState("");
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "fetchDetail",
    args: [address],
  });

  useEffect(() => {
    if (data) {
      //@ts-ignore
      setUserName(data?.userName);
    }
  }, [data]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  return (
    <div className="max-w-3xl flex flex-col mx-auto w-full">
      {data ? (
        <div className="flex flex-col gap-6 text-2xl">
          <h1>{`Organizer ${userName}`}</h1>
          <Uploader />
        </div>
      ) : (
        <Form {...form}>
          <form
            className="flex  flex-1 pt-12 h-full flex-col gap-10"
            onSubmit={form.handleSubmit((data) => console.log(data))}
          >
            <h1 className="text-3xl">Sign Up Here</h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Name" className="p-6" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email" className="p-6" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center">
              <p>Connect Aadhar here:</p>
              <AadharUploader />
            </div>
            <button
              className="p-2 bg-blue-500 text-white rounded-md"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Issuer;
