import type { CountryType } from "@/app/page";
import CountryCard from "@/components/country-card";
import Image from "next/image";
import Link from "next/link";

// async function getCountryByName(name: string): Promise<CountryType> {
//   const response = await fetch(
//     `https://restcountries.com/v3.1/name/${name}?fullText=true`
//   );
//   return (await response.json())[0];
// }

async function getCountryByName(name: string): Promise<CountryType> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  const countries: CountryType[] = await response.json();

  return countries.find((country: CountryType) => country.name.common == name)!;
}

async function getCountryBordersByName(name: string) {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const countries: CountryType[] = await response.json();

  const country = countries.find(
    (country: CountryType) => country.name.common == name
  )!;

  return country.borders?.map((border) => {
    const borderCountry = countries.find((country) => country.cca3 == border)!;
    return {
      name: borderCountry.name.common,
      ptName: borderCountry.translations.por.common,
      flag: borderCountry.flags.svg,
      flagAlt: `Bandeira do país ${name}`,
    };
  });
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(decodeURI(name));
  const borderCountries = await getCountryBordersByName(decodeURI(name));
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

      <section>
        <h3 className="mt-12 text-2xl font-semibold text-gray-800">
          Países que fazem fronteira
        </h3>
        <div className="grid grid-cols-5 w-full gap-3 mt-3">
          {borderCountries?.map((border) => (
            <CountryCard {...border} />
          ))}
        </div>
      </section>
    </section>
  );
}
