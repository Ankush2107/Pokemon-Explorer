import { notFound } from "next/navigation";
import Link from "next/link";

const TYPE_COLORS: Record<string, string> = {
  grass: "bg-green-400 text-white",
  poison: "bg-purple-400 text-white",
  fire: "bg-orange-400 text-white",
  water: "bg-blue-400 text-white",
  bug: "bg-lime-500 text-white",
  normal: "bg-gray-400 text-white",
  flying: "bg-indigo-300 text-white",
  electric: "bg-yellow-400 text-white",
  ground: "bg-yellow-700 text-white",
  fairy: "bg-pink-400 text-white",
  fighting: "bg-red-700 text-white",
  psychic: "bg-pink-600 text-white",
  rock: "bg-yellow-800 text-white",
  steel: "bg-gray-500 text-white",
  ice: "bg-cyan-300 text-white",
  ghost: "bg-indigo-700 text-white",
  dragon: "bg-purple-700 text-white",
  dark: "bg-gray-800 text-white",
};

function padId(id: string | number) {
  return `#${id.toString().padStart(3, "0")}`;
}

export async function generateStaticParams() {
  // Pre-generate for first 151 Pokemons
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();
  return data.results.map((pokemon: { url: string }) => {
    const id = pokemon.url.split("/").filter(Boolean).pop();
    return { id };
  });
}

async function getPokemon(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function PokemonDetail(props: { params: { id: string } }) {
  const { id } = props.params;
  const pokemon = await getPokemon(id);
  if (!pokemon) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image, name, badges, height, weight */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="mb-6 text-gray-600 hover:text-blue-600 flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm w-fit">
            <span className="text-xl">←</span> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-extrabold capitalize text-gray-800">{pokemon.name}</h1>
            <span className="bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow">{padId(pokemon.id)}</span>
          </div>
          <div className="flex gap-2 mb-4">
            {pokemon.types.map((t: any) => (
              <span
                key={t.type.name}
                className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${TYPE_COLORS[t.type.name] || "bg-gray-300 text-gray-800"}`}
              >
                {t.type.name}
              </span>
            ))}
          </div>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-60 h-60 object-contain bg-gray-100 rounded-xl shadow mb-6"
          />
          <div className="flex gap-12 text-lg text-gray-700 w-full justify-center md:justify-start">
            <div className="flex flex-col items-center">
              <span className="text-gray-500">Height</span>
              <span className="font-bold">{pokemon.height / 10}m</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-500">Weight</span>
              <span className="font-bold">{pokemon.weight / 10}kg</span>
            </div>
          </div>
        </div>
        {/* Right: Stats, Abilities, Moves */}
        <div className="flex flex-col gap-8 justify-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Base Stats</h2>
            <div className="flex flex-col gap-3">
              {pokemon.stats.map((s: any) => (
                <div key={s.stat.name} className="flex items-center gap-4">
                  <span className="w-28 capitalize text-gray-700 font-medium">{s.stat.name.replace("-", " ")}</span>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-4 rounded-full ${s.stat.name === "hp" ? "bg-red-500" : "bg-blue-500"}`}
                      style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-right font-bold text-gray-800">{s.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Abilities</h2>
            <div className="flex gap-3 flex-wrap">
              {pokemon.abilities.map((a: any) => (
                <span
                  key={a.ability.name}
                  className={`px-4 py-1 rounded-full text-sm font-semibold shadow ${a.is_hidden ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}
                >
                  {a.ability.name}
                  {a.is_hidden ? " (Hidden)" : ""}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Moves</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.moves.slice(0, 10).map((m: any) => (
                <span key={m.move.name} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  {m.move.name}
                </span>
              ))}
              {pokemon.moves.length > 10 && (
                <span className="text-gray-400 text-xs">and {pokemon.moves.length - 10} more...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 