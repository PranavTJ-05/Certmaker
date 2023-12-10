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
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { abi, contractAddress } from "@/lib/contractUtils";
import Uploader from "@/components/uploader";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAadharStatus } from "@/store/use-aadhar-status";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Space_Grotesk, Poppins } from "next/font/google";

const space_grotesk = Space_Grotesk({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
});
const Issuer = () => {
  const { address } = useAccount();
  const [userName, setUserName] = useState("");
  const { data } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "fetchDetail",
    args: [address],
  });
  const router = useRouter();
  const { status } = useAadharStatus();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { watch } = form;

  const {
    data: writeData,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "addDetails",
    args: [address, watch("name"), watch("email"), true, true],
  });

  useEffect(() => {
    if (data) {
      //@ts-ignore
      setUserName(data?.userName);
    }
    router.refresh();
  }, [data, isLoading]);

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
    }
  }, [isSuccess]);

  return (
    <div className="flex-1 flex items-start">
      {
        //@ts-ignore

        <div
          className={`max-w-3xl flex flex-col py-10 mx-auto w-full ${space_grotesk.className} `}
        >
          {data ? (
            //@ts-ignore
            data?.isIssuer ? (
              <div className="flex flex-col gap-6 text-2xl">
                <h1>{`Organizer ${userName}`}</h1>
                <Uploader />
              </div>
            ) : (
              <div>
                <p
                  className={`text-3xl w-fit mx-auto ${space_grotesk.className}`}
                >
                  User already exits and cant be an Issuer
                </p>
                <Image
                  src={"/smart-doodle.jpg"}
                  width={400}
                  height={400}
                  alt="logo"
                  className="w-[35rem] h-[35rem] mx-auto object-contain"
                />
              </div>
            )
          ) : (
            <Form {...form}>
              <form
                className="flex  flex-1 pt-12 h-full flex-col gap-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (status) {
                    write();
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
                  className="p-2 rounded-md  bg-black text-[#ebebebea]"
                  type="submit"
                  onClick={() => {
                    if (!status) {
                      toast({
                        title: "Error",
                        description: "Please connect your Aadhar",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  {!isLoading ? (
                    "Submit"
                  ) : (
                    <Loader2 className="animate-spin w-fit mx-auto" />
                  )}
                </button>
              </form>
            </Form>
          )}
        </div>
      }
    </div>
  );
};

export default Issuer;
