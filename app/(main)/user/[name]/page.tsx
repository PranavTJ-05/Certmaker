"use client";
import { toast } from "@/components/ui/use-toast";
import { abi, contractAddress } from "@/lib/contractUtils";
import { Copy, CopyIcon, CopyPlus, Forward, Share } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";

const Page = ({ params }: { params: { name: string } }) => {
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "fetchDetail",
    args: [address],
  });

  return (
    <div className="flex items-center justify-center w-full flex-1">
      {
        //@ts-ignore
        data?.isIssuer ? (
          <p className="text-3xl w-fit mx-auto">User is already an Issuer</p>
        ) : (
          <div className="relative flex flex-col gap-4">
            <button
              className="sticky w-fit border bg-gray-500/50 rounded-md top-20 flex  bg-white ml-auto"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(
                  `${window.origin}/user/${params.name}`
                );
                toast({
                  title: "Successfully copied to clipboard",
                });
              }}
            >
              <div className="cursor-pointer gap-3 flex p-2 sticky top-20 bg-white ml-auto">
                <p className="">Share your certificates url </p>

                <CopyIcon />
              </div>
            </button>
            <div className="max-w-7xl w-full mx-auto grid grid-cols-2 gap-4 p-3 items-center justify-center">
              {/* {params.name} */}
              {[...Array(10)].map((_, index) => (
                <div key={index} className="border p-6 rounded-sm mx-auto">
                  <Image
                    key={index}
                    src="/certificate-test.jpg"
                    alt="certificate"
                    width={500}
                    height={500}
                  />
                  <p>Sent by: 0x123456789</p>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Page;
