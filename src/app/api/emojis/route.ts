import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<Response> {
  const res = await fetch("https://api.github.com/emojis");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const _emojis = await res.json();
  const emojiNames = Object.keys(_emojis);

  return NextResponse.json(
    emojiNames.map((name) => ({
      name,
      url: _emojis[name],
    }))
  );
}
