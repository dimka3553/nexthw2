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

  console.log(request);

  return NextResponse.json({
    name: params.emoji,
    url: _emojis[params.emoji],
  });
}
