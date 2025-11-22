import React, { ReactNode } from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import Container from "@/components/container";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="grid lg:grid-cols-12 gap-6 mt-6">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9">{children}</div>
        </div>
      </Container>
    </>
  );
};

export default MarketingLayout;
