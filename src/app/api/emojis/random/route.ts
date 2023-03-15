import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { emoji: string } }
): Promise<Response> {
  const res = await fetch("https://api.github.com/emojis");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const _emojis = await res.json();

  const emojis = Object.keys(_emojis);
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  return NextResponse.json({
    name: randomEmoji,
    url: _emojis[randomEmoji],
  });
}
