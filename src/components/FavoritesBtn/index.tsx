"use client";
import { useEffect, useState } from "react";
import { MovieType } from "@/types/movie";

type FavoritesBtnProps = {
  movie: MovieType;
};

export default function FavoritesBtn({ movie }: FavoritesBtnProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        const isFavorite = parsedFavorites.find(
          (favorite: MovieType) => favorite.imdb_url === movie.imdb_url
        );
        setIsFavorite(!!isFavorite);
      }
    }
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        const isFavorite = parsedFavorites.find(
          (favorite: MovieType) => favorite.imdb_url === movie.imdb_url
        );
        if (isFavorite) {
          const newFavorites = parsedFavorites.filter(
            (favorite: MovieType) => favorite.imdb_url !== movie.imdb_url
          );
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
          setIsFavorite(false);
        } else {
          localStorage.setItem(
            "favorites",
            JSON.stringify([...parsedFavorites, movie])
          );
          setIsFavorite(true);
        }
      } else {
        localStorage.setItem("favorites", JSON.stringify([movie]));
        setIsFavorite(true);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        isFavorite ? "bg-red-500" : "bg-gray-500"
      } text-white px-5 py-2 rounded-md hover:scale-[1.02] active:scale-[0.98] transition-[0.15s]`}
    >
      {isFavorite ? "Remove from favorites" : "Add to favorites"}
    </button>
  );
}
