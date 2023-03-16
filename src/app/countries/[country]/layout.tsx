"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
export default function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [btcPrice, setBtcPrice] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
      );
      const data = await response.json();
      setBtcPrice(data.price);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2">
      {children}
      <div>
        <p className="font-bold">Real time BTC price</p>${btcPrice}
      </div>
    </div>
  );
}
