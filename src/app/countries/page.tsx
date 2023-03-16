import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "All Countries - Random Country Generator",
  description: "Lists all countires",
};

type Country = {
  name: string;
  official_name: string;
  flag_url: string;
  population: number;
  languages: { name: string }[];
  capital: string[];
  region: string;
};

const fetchCountries = async (): Promise<Country[]> => {
  const res = await fetch("https://restcountries.com/v3.1/all");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const countries = await res.json();

  //the response contains a lot of data, we only need the data from the Country type parse it
  return countries.map((country: any) => ({
    name: country.name.common,
    official_name: country.name.official,
    flag_url: country.flags.png,
    population: country.population,
    languages: country.languages,
    capital: country.capital,
    region: country.region,
  }));
};

export default async function CountriesPage() {
  const countries = await fetchCountries();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-bold">Countries</h1>
      <div className="flex gap-5 justify-around flex-wrap p-5">
        {" "}
        {countries.map((country, i) => (
          <Link href={`/countries/${country.official_name}`} key={i}>
            <div className="flex flex-col items-center py-2 px-3 bg-[#f4f6f9] rounded-md font-medium gap-2 hover:scale-105 active:scale-95 transition-[0.15s]">
              <p>{country.name}</p>
              <Image
                src={country.flag_url}
                alt={country.official_name}
                width={64}
                height={64}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
