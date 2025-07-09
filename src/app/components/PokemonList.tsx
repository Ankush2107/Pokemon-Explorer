"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface PokemonListResult {
  name: string;
  url: string;
}

interface PokemonCardData {
  id: string;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

const PAGE_SIZE = 20;

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

export default function PokemonList({ pokemons }: { pokemons: any[] }) {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <div className="w-full py-16 px-4 mb-0 bg-gradient-to-r from-red-400 via-blue-400 to-yellow-300 flex flex-col items-center justify-center">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">⚡</span>
          <h1 className="text-5xl font-extrabold text-white drop-shadow">Pokémon Explorer</h1>
        </div>
        <p className="text-lg text-white/90 font-medium text-center max-w-4xl mb-6">
          Discover and explore the amazing world of Pokémon! Search through hundreds of Pokémon and learn about their stats, abilities, and moves.
        </p>
        {mounted && (
          <input
            type="text"
            placeholder="Search for your favorite Pokémon..."
            className="w-full max-w-xl p-4 rounded-lg border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 mb-2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
          />
        )}
      </div>
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 px-2">
        {visible.map((pokemon) => (
          <Link
            key={pokemon.id}
            href={`/pokemon/${pokemon.id}`}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center p-8 border border-gray-100 relative min-h-[270px] min-w-[260px]"
          >
            <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              {padId(pokemon.id)}
            </span>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-24 h-24 object-contain mb-2 group-hover:scale-110 transition-transform"
              loading="lazy"
            />
            <span className="capitalize font-bold text-xl text-gray-800 mb-2">
              {pokemon.name}
            </span>
            <div className="flex gap-2 mb-2">
              {pokemon.types.map((type: string) => (
                <span
                  key={type}
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${TYPE_COLORS[type] || "bg-gray-300 text-gray-800"}`}
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="flex gap-6 text-sm text-gray-600 mt-auto">
              <span>
                <span className="font-semibold">Height:</span> {pokemon.height}m
              </span>
              <span>
                <span className="font-semibold">Weight:</span> {pokemon.weight}kg
              </span>
            </div>
          </Link>
        ))}
      </div>
      {visibleCount < filtered.length && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
} 