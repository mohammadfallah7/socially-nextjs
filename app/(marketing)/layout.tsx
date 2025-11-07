import React, { ReactNode } from "react";
import Navbar from "./_components/navbar";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MarketingLayout;
