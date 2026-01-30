"use client";
import { useState } from "react";
import { useGenerations } from "@/hooks/useGenerations";
import { usePokemons } from "@/hooks/usePokemons";
import PokemonCard from "@/components/PokemonCard";
import PokemonModal from "@/components/PokemonModal";


export default function Pokedex() {
    const GENERATIOS = {
            "generation-i": { limit: 151, offset: 0 },
            "generation-ii": { limit: 100, offset: 151 },
            "generation-iii": { limit: 135, offset: 251 },
            "generation-iv": { limit: 108, offset: 386 },
            "generation-v": { limit: 155, offset: 494 },
            "generation-vi": { limit: 72, offset: 649 },
            "generation-vii": { limit: 88, offset: 721 },
            "generation-viii": { limit: 89, offset: 809 },
            "generation-ix": { limit: 120, offset: 905 },
        }

    const [selectedGenId, setSelectedGenId] = useState<keyof typeof GENERATIOS>("generation-i");
    const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(null);
    const currentConfig = GENERATIOS[selectedGenId];
    const { data: pokemons, loading: loadingPokemons, error: pokemonsError } = usePokemons(currentConfig.limit, currentConfig.offset);
    const { data: generations, loading: loadingGenerations, error: generationsError } = useGenerations();

    const isEverithingLoaded = loadingPokemons || loadingGenerations;
    
    const handleGenerationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenId(e.target.value as keyof typeof GENERATIOS);
    };

    if(isEverithingLoaded) return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-2xl animate-bounce">Loading Pokedex...</p>
        </div>
    );

    return(
        <main className="p-8 bg-slate-900 min-h-screen text-white">
            <h1 className="text-4xl font-bold text-center mb-10 text-yellow-400">PokeAPI with React</h1>

            
            <div className="relative w-full max-w-xs mx-auto mb-8">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                    Filter generation
                </label>
                <select
                    value={selectedGenId}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white appearance-none focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none cursor-pointer transition-all hover:bg-slate-750 hover:border-slate-500"
                    onChange={handleGenerationChange}
                >
                    {generations.map((gen) => (
                        <option key={gen.name} value={gen.name}>{gen.name.toUpperCase()}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pt-6 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pokemons.map((pokemon) => (
                    <div key={pokemon.name} onClick={() => {
                        setSelectedPokemonName(pokemon.name);
                    }} className="text-left">
                        <PokemonCard
                            key={pokemon.name}
                            name={pokemon.name}
                            url={pokemon.url}
                        />
                    </div>
                ))}
            </div>

            <PokemonModal 
                pokemonName={selectedPokemonName}
                onClose={() => setSelectedPokemonName(null)}
            />
        </main>
    );
}