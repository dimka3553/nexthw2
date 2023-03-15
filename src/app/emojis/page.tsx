import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "All Emojis - Random Emoji Generator",
  description: "Lists all emojis",
};

type Emoji = {
  name: string;
  url: string;
};

const fetchEmojis = async (): Promise<Emoji[]> => {
  const res = await fetch("https://api.github.com/emojis");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const _emojis = await res.json();
  const emojiNames = Object.keys(_emojis);

  const emojis: Emoji[] = emojiNames.map((name) => ({
    name,
    url: _emojis[name],
  }));

  return emojis;
};

export default async function EmojiPage() {
  const emojis = await fetchEmojis();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-bold">Emojis</h1>
      <div className="flex gap-5 justify-between flex-wrap px-5">
        {" "}
        {emojis.map((emoji) => (
          <Link href={`/emojis/${emoji.name}`} key={emoji.name}>
            <div className="flex flex-col items-center py-2 px-3 bg-[#f4f6f9] w-full rounded-md font-medium gap-2 hover:scale-105 active:scale-95 transition-[0.15s]">
              <p>{emoji.name}</p>
              <Image src={emoji.url} alt={emoji.name} width={64} height={64} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
