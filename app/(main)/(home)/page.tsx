import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Space_Grotesk, Poppins } from "next/font/google";

const space_grotesk = Space_Grotesk({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const HomePage = () => {
  return (
    <div>
      {/* //Two sections with two cta */}
      <div className="flex flex-col overflow-hidden gap-4 justify-center items-center">
        {/* <Link href="/user/vinay" className="p-4 border">
          <button>User</button>
        </Link>
        <Link href="/issuer" className="p-4 border">
          <button>Issuer</button>
        </Link> */}
        {/* Image here */}
        <div className="flex flex-col w-screen gap-3 ">
          <div className=" flex justify-center items-center h-[calc(100vh-100px)] ">
            <div className="justify-center flex">
              <Image
                src={"/as-1.jpg"}
                width={400}
                height={400}
                alt="logo"
                className="w-[40rem] h-[40rem]"
              />
            </div>
            <div className="w-1/2">
              <div className="w-11/12 flex flex-col gap-7">
                <h2
                  className={`${space_grotesk.className} text-6xl font-semibold text-[#232323] `}
                >
                  <span>Own your proof,</span>
                  <span className="block">wield your power</span>
                </h2>
                <p className={`text-base w-5/6 ${poppins.className}`}>
                  Empowering Trust through transparency and Verifiable
                  Certifications
                </p>
                <Button variant="secondary" className="w-fit">
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          <div className="relative z-20 w-[calc(100vw-10vw)] rounded-xl mx-auto bg-slate-300 text-center flex flex-col gap-10 py-10 h-[calc(100vh-20vh)]">
            <h2 className={`${space_grotesk.className} text-4xl font-bold`}>
              Unlock the possibilities
            </h2>
            <div className="z-0 lg:w-80 lg:absolute lg:h-36 lg:border top-0 lg:rotate-45 lg:rounded-[100%] lg:border-gray-500 lg:p-10"></div>
            <div className="z-0 lg:w-80 lg:absolute lg:h-36 lg:border top-0 lg:rotate-90 lg:rounded-[100%] lg:border-gray-500 lg:p-10"></div>
            <div
              className={`flex justify-center items-center h-full ${poppins.className}`}
            >
              <div className="flex gap-28 mx-auto">
                <div className="flex flex-col w-full  mt-4 h-26 gap-8 justify-between items-center">
                  <Image
                    src={"/verefied-1.webp"}
                    width={50}
                    height={50}
                    alt="logo"
                    className="w-20 h-full flex flex-col justify-center items-center"
                  />
                  <p className="text-md">Verified certificate showcase</p>
                </div>
                <div className="flex flex-col w-full h-26 justify-between items-center">
                  <Image
                    src={"/verefied-3.webp"}
                    width={50}
                    height={50}
                    alt={""}
                    className="w-20"
                  />

                  <p className="text-md">Certification Issuance</p>
                </div>
                <div className="flex flex-col w-full h-26 justify-between items-center">
                  <Image
                    src={"/verefied-2.webp"}
                    width={50}
                    height={50}
                    alt={""}
                    className="w-20"
                  />

                  <p className="text-md">User Validation Control</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-8/12 mx-auto flex py-16 bg-[#fffff]">
            <div className="w-11/12">
              <h2 className={`text-3xl bold ${space_grotesk.className}`}>
                Why Choose Decert?
              </h2>
              <p className={`text-base w-11/12 py-6 ${poppins.className}`}>
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
            <Image src={"/question.png"} width={400} height={400} alt="logo" />
          </div>
        </div>

        <div className="border-t w-full text-center pt-4 border-black s">
          <div className={`${space_grotesk.className}`}>
            Built with 🖤 by EtheNinjas
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
