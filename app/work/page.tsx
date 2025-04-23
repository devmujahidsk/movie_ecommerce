import Image from "next/image";
import type { Metadata } from "next";
// import "./home.css";

export const metadata: Metadata = {
  title: "Work Page",
  description: "Work page is most",
};

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 xs:grid-cols-1 gap-4 items-center">
        <div className="text-wrap px-14 py-8">
          <h1 className="text-white text-5xl font-bold pb-8">
            Intelligent AI Solution for Contemporary Business
          </h1>
          <p className="text-white text-lg">
            Enhance, Streamline, Succeed. Our AI-powered solutions help
            businesses optimize workflows, personalize experience, and stay
            ahead in the ever-changing digital world.
          </p>
        </div>
        <div className="img-wrap">
          <Image src="/liq.png" alt="liq" priority width={800} height={1000} />
        </div>
      </div>
    </>
  );
}
