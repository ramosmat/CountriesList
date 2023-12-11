import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Países",
  description: "Uma lista de países criada com Next 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <main className="bg-gray-100 min-h-screen flex flex-col items-center">
          <nav className="w-full bg-white h-24 flex justify-center items-center">
            <section className="container flex items-center gap-3">
              <Image
                width={48}
                height={48}
                src="/logo.svg"
                alt="logo da aplicação globo terrestre"
              />
              <h1 className="font-bold text-2xl">Lista de Países</h1>
            </section>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
