import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* //Two sections with two cta */}
      <div className="flex gap-4">
        {/* <Link href="/user/vinay" className="p-4 border">
          <button>User</button>
        </Link>
        <Link href="/issuer" className="p-4 border">
          <button>Issuer</button>
        </Link> */}
        {/* Image here */}
        <div className="flex flex-col gap-3 text-3xl max-w-4xl">
          <p>Own your proof wield your power</p>
          <p>
            Empowering Trust through transparency and Verifiable Certifications
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
