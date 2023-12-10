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
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

const Page = ({ params }: { params: { address: string } }) => {
  const [collectible, setCollectible] = useState<string[]>([]);

  const { data, isError } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "fetchDetail",
    args: [params.address],
  });

  const { data: certificateData } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "fetchUserData",
    //@ts-ignore
    args: [data?.email],
  });

  useEffect(() => {
    if (certificateData) {
      console.log(certificateData);
      //@ts-ignore
      setCollectible(certificateData);
    }
  }, [certificateData]);

  return (
    <div className="flex items-start justify-center w-full flex-1">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-2 gap-4 p-3 items-center justify-center">
        {
          //@ts-ignore
          collectible && collectible.length > 0 ? (
            collectible.map((url, index) => (
              <div key={index} className="border p-6 rounded-sm mx-auto">
                <Image src={url} alt="certificate" width={500} height={500} />
              </div>
            ))
          ) : (
            <p>Sorry no certificates found</p>
          )
        }
      </div>
    </div>
  );
};

export default Page;
