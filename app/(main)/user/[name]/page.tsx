import Image from "next/image";
import React from "react";

const Page = ({ params }: { params: { name: string } }) => {
  return (
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
  );
};

export default Page;
