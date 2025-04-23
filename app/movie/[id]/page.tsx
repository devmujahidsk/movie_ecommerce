"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getMovieDetails } from "@/app/api/api";
import { useCartStore } from "@/app/store/cartStore"; // ✅ Zustand store import

type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
};

type CartItem = {
  id: number;
  movieId: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  price: number;
  quantity: number;
};

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const price = 700;

  const setCount = useCartStore((state) => state.setCount); // ✅ Zustand setter

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      const movieData = await getMovieDetails(id as string);
      setMovie(movieData);
    };
    fetchMovie();
  }, [id]);

  const handleAddToCart = async () => {
    if (!movie) return;

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieId: movie.id,
        title: movie.original_title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        price: price,
      }),
    });

    if (res.ok) {
      const updatedCartRes = await fetch("/api/cart");
      const data: CartItem[] = await updatedCartRes.json();
      const totalQuantity = data.reduce(
        (sum: number, item: CartItem) => sum + item.quantity,
        0
      );
      setCount(totalQuantity);
      alert("Movie added to cart!");
    } else {
      alert("Failed to add to cart.");
    }
  };

  if (!movie) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="text-white min-h-screen p-8 flex justify-between gap-8">
      {/* Banner Image */}
      <div className="relative w-full h-[500px]">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.original_title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Movie Details */}
      <div className="mt-8">
        <h1 className="text-4xl font-bold">{movie.original_title}</h1>
        <p className="text-gray-400 mt-2">Release Date: {movie.release_date}</p>
        <p className="text-gray-400">Rating: ⭐ {movie.vote_average}</p>
        <p className="mt-4">{movie.overview}</p>
        <h1 className="text-4xl font-bold">${price}</h1>

        {/* 🛒 Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-cyan-600 mix-blend-difference px-12 py-6 rounded-xl mt-10"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
