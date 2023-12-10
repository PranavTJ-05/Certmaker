"use client";
import AadharUploader from "@/components/aadhar-uploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { abi, contractAddress } from "@/lib/contractUtils";
import {
  Copy,
  CopyIcon,
  CopyPlus,
  Forward,
  Loader2,
  Share,
} from "lucide-react";
import Image from "next/image";

import z from "zod";
import React, { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useAadharStatus } from "@/store/use-aadhar-status";
import { Space_Grotesk, Poppins } from "next/font/google";

const space_grotesk = Space_Grotesk({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const Page = ({ params }: { params: { name: string } }) => {
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }),
  });
  const { address } = useAccount();

  const [collectible, setCollectible] = useState<string[]>([]);

  const { data, isError } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "fetchDetail",
    args: [address],
  });

  const { data: certificateData } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "fetchUserData",
    //@ts-ignore
    args: [data?.email],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const {
    data: writeData,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "addDetails",
    args: [
      address,
      form.getValues("name"),
      form.getValues("email"),
      true,
      false,
    ],
  });

  const { status } = useAadharStatus();

  useEffect(() => {
    console.log(certificateData);
    //@ts-ignore
    setCollectible(certificateData);
  }, [certificateData]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Successfully added details",
      });
      window.location.reload();
    }
  }, [isSuccess]);

  return (
    <div
      className={`flex items-start justify-center ${space_grotesk.className} w-full flex-1 py-6`}
    >
      {data ? (
        //@ts-ignore
        data?.isIssuer ? (
          <div>
            <p
              className={`text-2xl w-fit pt-10 mx-auto ${space_grotesk.className}`}
            >
              User is already an Issuer
            </p>
            <Image
              src={"/smart-doodle.jpg"}
              width={400}
              height={400}
              alt="logo"
              className="w-[40rem] h-[40rem] object-contain"
            />
          </div>
        ) : (
          <div className="relative flex flex-col gap-4">
            <button
              className="sticky w-fit border bg-gray-500/50 rounded-md top-20 flex  bg-white ml-auto"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(
                  `${window.origin}/user-certificate/${params.name}`
                );
                toast({
                  title: "Successfully copied to clipboard",
                });
              }}
            >
              <div className="cursor-pointer gap-6 flex p-2.5 sticky top-20 bg-white ml-auto">
                {
                  //@ts-ignore
                  <p className="">{data?.email!} your certificates url </p>
                }
                <CopyIcon />
              </div>
            </button>
            <div className="max-w-7xl w-full mx-auto grid grid-cols-2 gap-4 p-3 items-center justify-center">
              {/* {params.name} */}

              {
                //@ts-ignore
                collectible && !collectible.length > 0 ? (
                  <p>Sorry no certificates found</p>
                ) : (
                  //@ts-ignore
                  [...Array(certificateData?.length)].map((url, index) => (
                    <>
                      <div
                        key={index}
                        className="border p-4 rounded-sm mx-auto"
                      >
                        <Image
                          src={collectible[index]}
                          alt="certificate"
                          width={400}
                          height={400}
                        />
                      </div>
                      {/* <div
                        key={index}
                        className="border p-4 rounded-sm mx-auto"
                      >
                        <Image
                          src={collectible[index]}
                          alt="certificate"
                          width={400}
                          height={400}
                        />
                      </div>
                      <div
                        key={index}
                        className="border p-4 rounded-sm mx-auto"
                      >
                        <Image
                          src={collectible[index]}
                          alt="certificate"
                          width={400}
                          height={400}
                        />
                      </div> */}
                    </>
                  ))
                )
              }
            </div>
          </div>
        )
      ) : (
        <div className="max-w-3xl flex flex-col mx-auto w-full">
          <Form {...form}>
            <form
              className="flex flex-1 pt-12 h-full flex-col gap-10"
              onSubmit={(e) => {
                e.preventDefault();
                if (status) {
                  write();
                } else {
                  toast({
                    title: "Error",
                    description: "Please connect your Aadhar",
                    variant: "destructive",
                  });
                }
              }}
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
                className="p-2 bg-[#232323] text-white  w-full rounded-md"
                type="submit"
              >
                {!isLoading ? (
                  "Submit"
                ) : (
                  <Loader2 className="animate-spin w-fit mx-auto" />
                )}
              </button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Page;
