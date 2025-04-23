"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const SwiperSlider = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const speed = 1; // Adjust scrolling speed

  const images = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg", "/slide4.jpg"];
  const slides = [...images, ...images]; // Duplicate images for smooth looping

  // Handle mouse drag scrolling
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  // Auto-scroll functionality using requestAnimationFrame
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId: number;
    const smoothScroll = () => {
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0; // Reset to start when reaching midpoint
      } else {
        slider.scrollLeft += speed; // Move continuously
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    smoothScroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={sliderRef}
      className="overflow-hidden cursor-grab pb-40 active:cursor-grabbing bg-white w-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex space-x-5 w-max">
        {slides.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              className="object-cover rounded-3xl"
              width={1000}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwiperSlider;
