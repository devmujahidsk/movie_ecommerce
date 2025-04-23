"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const OverlappingSections = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.to(".fold2", {
        scale: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".fold2",
          start: "top bottom",
          end: "top top",
          scrub: true,
          markers: false, // Remove this in production
        },
      });
      gsap.to(".fold3", {
        scale: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".fold3",
          start: "top bottom",
          end: "top top",
          scrub: true,
          markers: false, // Remove this in production
        },
      });
      gsap.to(".fold4", {
        scale: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".fold4",
          start: "top bottom",
          end: "top top",
          scrub: true,
          markers: false, // Remove this in production
        },
      });
    }
  }, []);
  return (
    <div className="relative w-full">
      <div className="section fold1 h-screen flex items-center sticky top-0 w-full overflow-hidden justify-center text-white text-4xl font-bold z-[1]">
        <video autoPlay muted loop className="video">
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="section fold2 h-screen bg-blue-500 flex items-center sticky top-0 w-full overflow-hidden justify-center text-white text-4xl font-bold z-[2] transform translate-y-[-284px] scale-[0.5]">
        <video autoPlay muted loop className="video">
          <source src="/oswald.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="section fold3 h-screen bg-green-500 flex items-center sticky top-0 w-full overflow-hidden justify-center text-white text-4xl font-bold z-[3] transform translate-y-[-284px] scale-[0.5]">
        <video autoPlay muted loop className="video">
          <source src="/secret-smoke.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="section fold4 h-screen bg-yellow-300 flex items-center sticky top-0 w-full overflow-hidden justify-center text-white text-4xl font-bold z-[4] transform translate-y-[-284px] scale-[0.5]">
        <Image
          src="/motion-shot.jpg"
          alt="motion"
          className="w-full h-screen"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
};

export default OverlappingSections;
