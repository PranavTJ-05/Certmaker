import React from "react";

const Page = ({ params }: { params: { name: string } }) => {
  return <div>{params.name}</div>;
};

export default Page;
