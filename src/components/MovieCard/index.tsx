import Image from "next/image";
import Link from "next/link";
import { MovieType } from "@/types/movie";

interface MovieCardProps {
  movie: MovieType;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`movie/${movie.imdb_url.replace(/\/title\//g, "")}`}>
      <div className="bg-white hover:scale-110 transition-[0.2s] max-h-[150px] overflow-hidden relative hover:z-[12] rounded-md active:scale-95 cursor-pointer">
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
    </Link>
  );
}
