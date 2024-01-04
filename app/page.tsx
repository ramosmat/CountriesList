import Image from "next/image";
import Link from "next/link"; //O link será usado como uma tag pai da Article, que funcionará como redirecionamento para as páginas de cada país, usando seu nome

//Tipando os valores existentes nos objetos que a API retorna como CountryType
export type CountryType = {
  name: {
    common: string;
  };
  translations: {
    por: {
      official: string;
      common: string;
    };
  };
  flags: {
    png: string;
    svg: string;
  };
  capital: string;
  region: string;
  subregion: string;
  population: number;
  languages: string;
};

//Funções assincronas retorna uma promessa, que no caso é um array com os objetos que forem definidos anteriormente no type CountryType. E também o que estiver dentro do return()
async function getCountries(): Promise<CountryType[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json();
}

export default async function Home() {
  const countries = await getCountries();

  return (
    <section className="grid grid-cols-5 w-full container gap-2 mt-12">
      {countries.map((country) => (
        <Link href={`/pais/${country.name.common}`}>
          <article className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 transition-all hover:shadow-xl">
            <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
              <Image
                src={country.flags.svg}
                alt="Flag"
                fill
                className="object-cover"
              />
            </div>
            <h1
              key={country.translations.por.common}
              className="font-semibold text-lg text-center mt-1"
            >
              {country.translations.por.common}
            </h1>
          </article>
        </Link>
      ))}
    </section>
  );
}
