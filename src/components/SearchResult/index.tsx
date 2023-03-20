import { MovieType } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";

type SearchResultProps = {
  movie: MovieType;
  setOpen: (open: boolean) => void;
};

export default function SearchResult({ movie, setOpen }: SearchResultProps) {
  return (
    <Link
      href={`movie/${movie.imdb_url.replace(/\/title\//g, "")}`}
      onClick={() => setOpen(false)}
    >
      <div className="flex items-center w-full p-5 gap-5 hover:bg-slate-100 transition-[0.2s]">
        <Image
          src={movie.thumb_url}
          width={60}
          height={60}
          alt={movie.name}
          className="max-h-[60px] max-w-[60px] object-cover rounded-md"
        />
        <div>
          <h3 className="font-bold">{movie.name}</h3>
          <p className="text-slate-400">{movie.year}</p>
        </div>
      </div>
    </Link>
  );
}
