"use client";

import { useState, useEffect } from "react";

export default function PokemonModal({ pokemonName, onClose }: Readonly<{ pokemonName: string | null, onClose: () => void}>) {
    const [detail, setDetail] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!pokemonName) return;

        const fetchDetail = async () => {
            setLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();

            setDetail(data);
            setLoading(false);
        };

        fetchDetail();
    }, [pokemonName]);

    if(!pokemonName) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl overflow-hidden relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl cursor-pointer border border-slate-700 rounded-md pl-2 pr-2 hover:border-slate-500">X</button>

                {loading ? (
                    <div className="p-20 font-bold text-center text-yellow-400 animate-pulse">Loading...</div>
                ) : (
                    
                    <div className="p-8 text-center">
                        <span className="absolute top-4 left-4 text-white text-2xl">#{detail.id}</span>
                        <img
                            src={detail.sprites.other["official-artwork"].front_default}
                            className="w-48 h-48 mx-auto"
                            alt={pokemonName}
                        />
                        <h2 className="text-3xl font-bold capitalize mt-4">{detail.name}</h2>

                        <div className="flex justify-center gap-4 mt-4">
                            {detail.types.map((t: any) => (
                                <span key={t.type.name} className="px-4 py-1 rounded-full bg-slate-700 border border-yellow-400/50">
                                    {t.type.name}
                                </span>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {detail.stats.map((s: any) => (
                                <div key={s.stat.name} className="text-left bg-slate-900/50 p-2 rounded">
                                    <p className="text-xs text-slate-400 uppercase">{s.stat.name}</p>
                                    <p className="font-bold">{s.base_stat}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}