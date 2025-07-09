"use client";
import Link from "next/link";
import { useState } from "react";

interface PokemonListResult {
  name: string;
  url: string;
}

export default function PokemonList({ pokemons }: { pokemons: PokemonListResult[] }) {
  const [search, setSearch] = useState("");
  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        className="w-full p-3 mb-8 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-indigo-900 border-indigo-200"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          const imgUrl =
            id &&
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          return (
            <Link
              key={pokemon.name}
              href={`/pokemon/${id}`}
              className="group bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col items-center p-4 border border-transparent hover:border-indigo-400"
            >
              <img
                src={imgUrl}
                alt={pokemon.name}
                className="w-20 h-20 object-contain mb-2 group-hover:scale-110 transition-transform"
                loading="lazy"
              />
              <span className="capitalize font-semibold text-indigo-700 text-center">
                {pokemon.name}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
} 