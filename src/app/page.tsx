import EmojiBox from "@/components/EmojiBox";

export const metadata = {
  title: "Home - Random Emoji Generator",
  description: "Generate a random emoji!",
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

export default async function Home() {
  const emojis = await fetchEmojis();
  const initialEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  return (
    <main>
      <h1 className="text-lg font-bold">Random Emoji Generator</h1>
      <EmojiBox emojis={emojis} initialEmoji={initialEmoji} />
    </main>
  );
}
