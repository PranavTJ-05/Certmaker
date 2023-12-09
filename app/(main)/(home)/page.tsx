import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* //Two sections with two cta */}
      <div className="flex gap-4 justify-center items-center">
        {/* <Link href="/user/vinay" className="p-4 border">
          <button>User</button>
        </Link>
        <Link href="/issuer" className="p-4 border">
          <button>Issuer</button>
        </Link> */}
        {/* Image here */}
        <div className="flex flex-col w-screen gap-3 text-3xl ">
          <div className=" flex justify-center items-center h-screen">
            <div className="w-1/2 justify-center flex">
              <Image src={"/as-1.jpg"} width={400} height={400} alt="logo" />
            </div>
            <div className="w-1/2">
              <div className="w-10/12">
                <h2 className="text-5xl ">
                  <span>Own your proof,</span>
                  <span className="block">wield your power</span>
                </h2>
                <p className=" text-lg w-3/4">
                  Empowering Trust through transparency and Verifiable
                  Certifications
                </p>
                <Button variant="secondary">Get Started</Button>
              </div>
            </div>
          </div>

          <div className="w-full text-center flex flex-col gap-10 py-10 h-screen">
            <h2 className="text-3xl bold">Unlock the possibilities</h2>
            <div className="flex">
              <div className="flex gap-28 mx-auto">
                <div className="flex flex-col w-full items-center">
                  <Image
                    src={"/verefied.webp"}
                    width={400}
                    height={400}
                    alt="logo"
                    className="w-36 h-36 "
                  />
                  <p className="text-lg">Verified certificate showcase</p>
                </div>
                <div className="flex flex-col w-full items-center">
                  <Image
                    src={"/verefied.jpg"}
                    width={400}
                    height={400}
                    alt={""}
                    className="w-36 h-36"
                  />

                  <p className="text-lg">Certification Issuance</p>
                </div>
                <div className="flex flex-col w-full items-center">
                  <Image
                    src={"/user-val.jpg"}
                    width={400}
                    height={400}
                    alt={""}
                    className="w-36 h-36"
                  />

                  <p className="text-lg">User Validation Control</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full py-16 bg-[#F6F6F4]">
            <div className="w-7/12 mx-auto">
              <h2 className="text-3xl bold ">Why Choose Decert?</h2>
              <p className="text-base w-9/12 py-6">
                At Decert, transparency drives trust. With our user-centric
                approach, certifications are stored securely using IPFS and
                Filecoin via Lighthouse, ensuring permanent integrity and easy
                access. Our intuitive interface simplifies verification,
                empowering users with complete control over their
                certifications. This fusion of transparency, user control, and
                secure storage makes certifications both secure and effortlessly
                accessible.
              </p>
              <Button variant="secondary">Get Started</Button>
            </div>
            {/* <Image/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
