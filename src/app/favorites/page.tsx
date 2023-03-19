"use client";

import { useEffect, useState } from "react";
import { MovieType } from "@/types/movie";
import MovieCard from "@/components/MovieCard";

export default function FavoritesPage() {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        setMovies(parsedFavorites);
      }
    }
  }, []);

  return (
    <main className="grid grid-cols-1 min-[800px]:grid-cols-3 min-[400px]:grid-cols-2 gap-5 px-5 w-full min-[1000px]:grid-cols-4 mx-auto max-w-[1200px]">
      {movies.map((movie, i) => (
        <MovieCard movie={movie} key={i} />
      ))}
    </main>
  );
}
