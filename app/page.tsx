import CountryCard from "@/components/country-card";
import { StaticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";
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
  languages: {
    [key: string]: string;
  };
  borders?: string[];
  cca3: string;
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
        <CountryCard
          key={country.name.common}
          name={country.name.common}
          ptName={country.translations.por.common}
          flag={country.flags.svg}
          flagAlt="Flag do país"
        />
      ))}
    </section>
  );
}
