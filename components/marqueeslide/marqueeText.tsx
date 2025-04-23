"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

export const MarqueeText = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const marqueeWidth = marquee.scrollWidth / 2; // Ensure smooth looping

    gsap.to(marquee, {
      x: `-${marqueeWidth}px`, // Move full width left
      ease: "linear",
      duration: 30, // Adjust speed
      repeat: -1, // Infinite loop
    });
  }, []);

  return (
    <div className="overflow-hidden py-9 bg-black">
      <Link
        href="https://www.wheregiantsroam.co.uk/work/"
        className="tickerLink text-5xl font-neutral text-white whitespace-nowrap block"
      >
        <div ref={marqueeRef} className="flex">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              {Array(8)
                .fill("View all projects")
                .map((text, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-nowrap gap-8"
                  >
                    <div>{text}</div>
                    <Image
                      alt="arrow"
                      width={60}
                      height={50}
                      className="rotate-90 mr-20"
                      src="/arrow-external-white.svg"
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};
