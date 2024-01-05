import type { CountryType } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

async function getCountryByName(name: string): Promise<CountryType> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  return (await response.json())[0];
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(name);

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl text-center font-bold text-gray-800 my-16">
        {country.translations.por.common}
      </h1>

      <Link className="flex py-2" href={"/"}>
        <Image
          src={"/arrow-back.svg"}
          alt="arrow icon"
          width={24}
          height={24}
        ></Image>
        Voltar
      </Link>

      <article className="flex justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          {country.capital?.length && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🌆 Capital:</b> {country.capital}
            </h2>
          )}
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗺️ Continente:</b> {country.region}
            {country.subregion?.length && `- ${country.subregion}`}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👨‍👩‍👧‍👦 População:</b> {formatter.format(country.population)}
          </h2>
          {country.languages && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🗣️ Línguas faladas:</b> <br />
              {Object.values(country.languages).map((language) => (
                <span
                  className="inline-block px-2 bg-indigo-700 mr-2 text-white text-sm rounded-full"
                  key={language}
                >
                  {language}
                </span>
              ))}
            </h2>
          )}
        </section>

        <div className="relative h-auto w-96 rounded-xl shadow-md">
          <Image
            src={country.flags.svg}
            alt="Bandeira do pais"
            fill
            className="object-cover rounded-xl"
          ></Image>
        </div>
      </article>
    </section>
  );
}
