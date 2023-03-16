import Image from "next/image";

type Country = {
  name: string;
  official_name: string;
  flag_url: string;
  population: number;
  capital: string[];
  region: string;
};

export async function generateMetadata({
  params,
}: {
  params: { country: string };
}) {
  // replace %20 with space
  params.country = params.country.replace(/%20/g, " ");
  return { title: params.country, description: "Country page" };
}
const getCountry = async (name: string): Promise<Country> => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const country = await res.json();

  return country.map((country: any) => ({
    name: country.name.common,
    official_name: country.name.official,
    flag_url: country.flags.png,
    population: country.population,
    capital: country.capital,
    region: country.region,
  }))[0];
};

export default async function CountryPage({
  params,
}: {
  params: { country: string };
}) {
  const country = await getCountry(params.country);
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">{country.name}</h1>
      <div className="flex flex-col items-center gap-4">
        <Image
          src={country.flag_url}
          alt={`${country.name} flag`}
          width={250}
          height={250}
        />
        <div>
          <h2 className="text-2xl font-semibold mb-4">Details</h2>

          <p>
            <strong>Official Name:</strong> {country.official_name}
          </p>
          <p>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p>
            <strong>Capital(s):</strong> {country.capital?.join(", ")}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
        </div>
      </div>
    </main>
  );
}
