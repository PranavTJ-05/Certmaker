import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* //Two sections with two cta */}
      <div className="flex gap-4">
        <Link href="/user" className="p-4 border">
          <button>User</button>
        </Link>
        <Link href="/issuer" className="p-4 border">
          <button>Issuer</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
