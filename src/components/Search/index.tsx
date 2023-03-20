"use client";
import styles from "./styles.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { MovieType } from "@/types/movie";
import { useEffect, useState } from "react";
import SearchResult from "../SearchResult";

const fetchMovies = async (): Promise<MovieType[]> => {
  const res = await fetch(
    "https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  let movies = await res.json();
  movies = movies.sort((a: MovieType, b: MovieType) => b.rating - a.rating);
  movies = movies.map((movie: MovieType) => {
    movie.name = movie.name.replace(/&apos;/g, "'");
    return movie;
  });
  return await movies;
};

export default function Search() {
  useEffect(() => {
    fetchMovies().then((movies) => {
      setMovies([]);
      setAllMovies(movies);
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filteredMovies = allMovies.filter((movie) =>
        movie.name.toLowerCase().includes(query.toLowerCase())
      );
      setMovies(filteredMovies);
    } else {
      setMovies([]);
    }
  };

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [allMovies, setAllMovies] = useState<MovieType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>Search</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay}>
          <Dialog.Content className={styles.DialogContent}>
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearch}
              value={searchQuery}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />

            <div className="bg-white rounded-md flex flex-col">
              {movies.map((movie, i) => (
                <SearchResult movie={movie} setOpen={setOpen} key={i} />
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
