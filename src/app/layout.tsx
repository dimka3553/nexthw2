import "./globals.css";
import Link from "next/link";
import Search from "@/components/Search";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f4f6f9]">
        <nav className="h-16  text-primary sticky top-0 z-[11] bg-[#f4f6f9]">
          <div className="max-w-[1200px] px-5 items-center flex gap-5 justify-between h-full mx-auto">
            <div className="font-bold text-lg">
              <Link href="/">IMDB</Link>
            </div>
            <div className="flex items-center gap-5">
              <Search />
              <Link href="/favorites">Favorites</Link>
            </div>
          </div>
        </nav>
        <div className="pb-5">{children}</div>
      </body>
    </html>
  );
}
