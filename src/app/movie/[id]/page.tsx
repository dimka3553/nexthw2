import FavoritesBtn from "@/components/FavoritesBtn";
import { MovieType } from "@/types/movie";
import Image from "next/image";

const fetchMovie = async (id: string): Promise<MovieType> => {
  const res = await fetch(
    "https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  let movies = await res.json();
  movies = movies.map((movie: MovieType) => {
    movie.name = movie.name.replace(/&apos;/g, "'");
    return movie;
  });
  return movies.filter(
    (movie: MovieType) =>
      movie.imdb_url.replace(/\/title\//g, "").replace(/\//g, "") === id
  )[0];
};

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await fetchMovie(params.id);
  console.log(movie.name);
  return (
    <main className="max-w-[1200px] mx-auto px-5">
      <div className="flex gap-10 max-[800px]:flex-col ">
        <Image
          src={movie.image_url}
          width={500}
          height={500}
          alt={movie.name}
          className="max-[800px]:h-[300px] max-[800px]:w-full object-cover"
        />

        <div className="flex flex-col gap-5">
          {" "}
          <h1 className="text-3xl font-bold">{movie.name}</h1>
          <span>
            🗓️ {movie.year} | ⭐️ {movie.rating} / 10
          </span>
          <div className="flex gap-5">
            {" "}
            {movie.genre.map((genre, i) => (
              <div className="px-2 py-1 bg-[#0066ff22] text-primary" key={i}>
                {genre}
              </div>
            ))}
          </div>
          <h2 className="font-bold text-lg">Summary</h2>
          <p>{movie.desc.replace(/&apos;/g, "'")}</p>
          <h2 className="font-bold text-lg">Actors</h2>
          <div className="flex gap-5">
            {movie.actors.map((actor, i) => (
              <div className="px-2 py-1 bg-[#ffa60022] text-[#ff9500]" key={i}>
                {actor}
              </div>
            ))}
          </div>
          <FavoritesBtn movie={movie} />
        </div>
      </div>
    </main>
  );
}
