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
    <div className="flex justify-between items-center">
      <h1>DECERT</h1>
      <ul className="flex gap-4">
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
          onClick={() => {
            open();
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <button
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
