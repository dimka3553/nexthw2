import { MovieType } from "@/types/movie";
import Image from "next/image";

export const metadata = {
  title: "Home - IMDB 250",
  description: "250 movies from IMDB",
};

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

export default async function Home() {
  const movies = await fetchMovies();
  return (
    <main className="grid grid-cols-1 min-[800px]:grid-cols-3 min-[400px]:grid-cols-2 gap-5 px-5 w-full min-[1000px]:grid-cols-4 mx-auto max-w-[1200px]">
      {movies.map((movie, i) => (
        <div
          key={i}
          className="bg-white hover:scale-110 transition-[0.2s] max-h-[150px] overflow-hidden relative hover:z-10 rounded-md active:scale-95 cursor-pointer"
        >
          <Image
            src={movie.image_url}
            width={300}
            height={300}
            alt={movie.name}
            className="h-[150px] w-full object-cover"
          />
          <div className="absolute top-0 p-5 w-full h-full hover:bg-[#00000088] transition-[0.2s] hover:text-white text-transparent">
            <h1 className="text-lg font-bold">{movie.name}</h1>
            <p>Rating: {movie.rating} / 10</p>
            <p>{movie.year}</p>
          </div>
        </div>
      ))}
    </main>
  );
}
