"use client";
import { useTeam } from "@/context/TeamContext";

export default function TeamBar() {
    const { team, removeFromTeam } = useTeam();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-md border-t border-slate-700 p-4 z-40">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-400">
                        Your Team ({team.length} / 6)
                    </h2>
                    {team.length === 0 && (
                        <p className="text-xs text-slate-400 italic">Add pokemons to your team!</p>
                    )}
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {[...Array(6)].map((_, index) => {
                        const pokemon = team[index];
                        return (
                            <div
                                key={index}
                                className="mt-2 w-20 h-20 rounded-lg border-2 border-dashed border-slate-600 flex-shrink-0 relative flex items-center justify-center bg-slate-900/50"
                            >
                                {pokemon ? (
                                    <>
                                        <img
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').filter(Boolean).pop()}.png`}
                                            alt={pokemon.name}
                                            className="w-16 h-16 object-contain"
                                        />
                                        <button
                                            onClick={() => removeFromTeam(pokemon.name)}
                                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full w-5 h-5 text-[10px] flex items-center justify-center border border-white"
                                        >
                                            ✕
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-slate-700 font-bold text-xl">{index + 1}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}