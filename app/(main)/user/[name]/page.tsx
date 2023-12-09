"use client";
import { toast } from "@/components/ui/use-toast";
import { Copy, CopyIcon, CopyPlus, Forward, Share } from "lucide-react";
import Image from "next/image";
import React from "react";

const Page = ({ params }: { params: { name: string } }) => {
  return (
    <div className="relative flex flex-col gap-4">
      <button
        className="sticky w-fit border bg-gray-500/50 rounded-md top-20 flex  bg-white ml-auto"
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(`${window.origin}/user/${params.name}`);
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
  );
};

export default Page;
