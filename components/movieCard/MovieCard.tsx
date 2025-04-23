"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPopularMovies } from "@/app/api/api";

type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
};

type MovieCardProps = {
  title: string;
};

export default function MovieCard({ title }: MovieCardProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await getPopularMovies();
      setMovies(movieData);
    };
    fetchMovies();
  }, []);

  return (
    <>
      <div className="title-wrap">
        <h2 className="text-3xl font-bold text-white mb-8 mt-8 flex justify-center">
          {title}
        </h2>
      </div>

      {/* ✅ FIXED GRID LAYOUT */}
      <div className="movie_card-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8 w-full">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            // href={"#"}
            className="relative flex flex-col bg-gray-800 rounded-[24px] p-6 text-white shadow-lg transition-transform duration-300 hover:scale-105"
          >
            {/* ✅ FIXED IMAGE PLACEMENT */}
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              width={100}
              height={100}
              className="w-full h-auto rounded-lg object-cover"
              priority
            />
            <div className="heart-icon absolute top-8 right-8">
              <svg
                id="icon-love"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="butt"
                  strokeMiterlimit="4"
                  strokeWidth="2"
                  fill="red"
                  stroke="#fff"
                  d="M17.785 34.8c1.402 0.795 2.563-0.98 2.73-1.848 0.332-1.533 0.867-3.438 2.213-2.44s1.697-0.37 2.472-2.847c0.885-2.753 1.752-1.22 2.453-0.887s1.42-0.297 1.845-2.2c0.83-3.142 1.55-2.735 2.675-1.96s1.845-1.072 2.048-2.458c0.443-2.422 0.94-2.2 1.752-1.958 1.107 0.333 1.587 0.37 2.362-3.217v-0.277c0-0.011 0-0.025 0-0.039 0-2.665-1.071-5.080-2.806-6.837l0.001 0.001c-1.812-1.81-4.267-2.827-6.825-2.827s-5.013 1.017-6.825 2.827l-1.845 1.848-1.457-1.46-0.407-0.388c-0.875-0.876-1.917-1.585-3.075-2.074l-0.063-0.024c-1.173-0.487-2.432-0.737-3.702-0.735s-2.528 0.252-3.7 0.74c-1.221 0.515-2.262 1.226-3.136 2.103l-0 0c-1.749 1.754-2.83 4.175-2.83 6.847 0 2.678 1.085 5.102 2.84 6.858l-0-0 13.282 13.252z"
                ></path>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold">
              {movie.original_title}
            </h3>
            <p className="text-gray-400">{movie.release_date}</p>
            <h3 className="mt-4 text-lg font-semibold">$700</h3>
          </Link>
        ))}
      </div>
    </>
  );
}
