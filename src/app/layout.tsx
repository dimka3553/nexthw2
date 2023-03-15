import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col gap-5">
        <nav className="h-16 flex items-center justify-center gap-5 text-primary border-b-1 border-slate-200">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/emojis">Emojis</Link>
        </nav>
        <div className="flex justify-center text-center">{children}</div>
      </body>
    </html>
  );
}
