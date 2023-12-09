"use client";
import { cn } from "@/lib/utils";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
// import { useWindowScroll } from "react-use";
import { useAccount, useDisconnect } from "wagmi";

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const [isMounted, setIsMounted] = React.useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex sticky top-0 z-[1000] bg-white justify-between items-center p-2">
      <Link href="/">
        <h1 className="text-2xl cursor-pointer">Decert.</h1>
      </Link>
      <div className="flex items-center gap-8">
        <ul className="hidden md:flex text-lg gap-4 p-2">
          {address && (
            <Link
              className={cn(
                pathname.includes("user")
                  ? "font-semibold"
                  : "font-normal opacity-70"
              )}
              href={`/user/${address}`}
            >
              <button>User</button>
            </Link>
          )}
          {address && (
            <Link
              href="/issuer"
              className={cn(
                pathname.includes("issuer")
                  ? "font-semibold"
                  : "font-normal opacity-70"
              )}
            >
              <button>Issuer</button>
            </Link>
          )}
        </ul>
        {!address ? (
          <button
            className="text-md py-2.5 px-6 rounded-full bg-black text-[#ebebebea]"
            onClick={() => {
              open();
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <button
            className="text-md py-2.5 px-6 rounded-full bg-black text-[#ebebebea]"
            onClick={() => {
              disconnect();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
