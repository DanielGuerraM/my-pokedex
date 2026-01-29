import { useState, useEffect } from "react";
import { Pokemon } from "@/types/pokemon";

export function usePokemons(limit: number, offset: number) {
    const [data, setData] = useState<Pokemon[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const retrievePokemons = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}}&offset=${offset}`);
                const json = await response.json();

                setData(json.results);
            }
            catch (error) {
                setError(error instanceof Error ? error.message : "Error desconocido");
            }
            finally {
                setLoading(false);
            }
        };

        retrievePokemons();
    }, [limit, offset]);

    return { data, loading, error };
}