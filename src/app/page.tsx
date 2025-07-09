import PokemonList from "./components/PokemonList";

async function getPokemonsWithDetails() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();
  const results = data.results;
  const detailed = await Promise.all(
    results.map(async (pokemon: { name: string; url: string }) => {
      const id = pokemon.url.split("/").filter(Boolean).pop();
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      return {
        id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        types: data.types.map((t: any) => t.type.name),
        height: data.height / 10, // decimeters to meters
        weight: data.weight / 10, // hectograms to kg
      };
    })
  );
  return detailed;
}

export default async function Home() {
  const pokemons = await getPokemonsWithDetails();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <PokemonList pokemons={pokemons} />
      </div>
    </div>
  );
}
