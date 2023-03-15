import EmojiBox from "@/components/EmojiBox";

type Emoji = {
  name: string;
  url: string;
};

type Res = {
  emojis: Emoji[];
  emoji: Emoji;
};

const getEmoji = async (name: string): Promise<Res> => {
  const res = await fetch("https://api.github.com/emojis");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const _emojis = await res.json();
  const _emoji_url = _emojis[name];
  const emoji: Emoji = {
    name,
    url: _emoji_url,
  };

  const emojiNames = Object.keys(_emojis);

  const emojis: Emoji[] = emojiNames.map((name) => ({
    name,
    url: _emojis[name],
  }));

  return { emojis, emoji };
};

export default async function EmojiPage({
  params,
}: {
  params: { emoji: string };
}) {
  const emoji = await getEmoji(params.emoji);
  return (
    <main>
      <h1 className="text-lg font-bold">Random Emoji Generator</h1>
      <EmojiBox initialEmoji={emoji.emoji} emojis={emoji.emojis} />
    </main>
  );
}
