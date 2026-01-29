import { useState, useEffect } from "react";
import { Generation } from "@/types/pokemon";

export function useGenerations() {
    const [data, setData] = useState<Generation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenerations = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://pokeapi.co/api/v2/generation');

                if(!response.ok) throw new Error("Error retrieving data");
                const json = await response.json();
                setData(json.results);
            }
            catch (error) {
                setError(error instanceof Error ? error.message : "Unknow error")
            }
            finally {
                setLoading(false);
            }
        }

        fetchGenerations();
    }, [])

    return { data, loading, error };
}