import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f4f6f9]">
        <nav className="h-16  text-primary">
          <div className="max-w-[1200px] px-5 items-center flex  gap-5 justify-between h-full mx-auto">
            <div className="font-bold text-lg">
              <Link href="/">IMDB</Link>
            </div>
            <div>Top 250</div>
          </div>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  );
}
