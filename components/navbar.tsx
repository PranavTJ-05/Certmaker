"use client";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const [isMounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex justify-between items-center p-2">
      <Link href="/">
        <h1 className="text-2xl cursor-pointer">Decert.</h1>
      </Link>
      <ul className="hidden lg:flex gap-4">
        <li>Home</li>
        <Link href="/user">
          <button>User</button>
        </Link>
        <Link href="/issuer">
          <button>Issuer</button>
        </Link>
      </ul>
      {!address ? (
        <button
          className="text-lg py-2 px-6 rounded-full bg-blue-600 text-white"
          onClick={() => {
            open();
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="text-lg py-2 px-6 rounded-full bg-blue-600 text-white"
          onClick={() => {
            disconnect();
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
