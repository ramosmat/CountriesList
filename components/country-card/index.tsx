import Image from "next/image";
import Link from "next/link";

export default function CountryCard({
  name,
  ptName,
  flag,
  flagAlt,
}: {
  name: string;
  ptName: string;
  flag: string;
  flagAlt: string;
}) {
  return (
    <Link href={`/pais/${name}`}>
      <article
        className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 transition-all hover:shadow-xl"
        key={name}
      >
        <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
          <Image src={flag} alt={flagAlt} fill className="object-cover" />
        </div>
        <h1 key={ptName} className="font-semibold text-lg text-center mt-1">
          {ptName}
        </h1>
      </article>
    </Link>
  );
}
