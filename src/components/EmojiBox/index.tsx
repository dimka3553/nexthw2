"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../Button";

type Emoji = {
  name: string;
  url: string;
};

type EmojiBoxProps = {
  emojis: Emoji[];
  initialEmoji: Emoji;
};

const getRandomEmoji = (emojis: Emoji[]): Emoji => {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

export default function EmojiBox({ emojis, initialEmoji }: EmojiBoxProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 items-center">
      <p>{initialEmoji.name}</p>
      <Image
        src={initialEmoji.url}
        alt={initialEmoji.name}
        width={64}
        height={64}
      />
      <Button
        onClick={() => {
          router.push(`/emojis/${getRandomEmoji(emojis).name}`);
        }}
      >
        Generate
      </Button>
    </div>
  );
}
