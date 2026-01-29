import { useTeam } from "@/context/TeamContext";

interface PokemonCardProps {
    readonly name: string;
    readonly url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
    const { addToTeam, team } = useTeam();

    const isAlreadyInTeam = team.some(p => p.name === name);
    const id = url.match(/\/pokemon\/(\d+)\//)?.[1];
    const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (     
        <div
            key={id}
            className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-slate-500 transition-all cursor-pointer capitalize text-center"
        >
            <p className="font-semibold">{name}</p>
            <img
                src={urlImage}
                alt={name}
                className="mx-auto w-24 h-24"
            />
            <p className="font-semibold">#{id}</p>

            <button
                disabled={isAlreadyInTeam}
                onClick={(e) => {
                    e.stopPropagation();
                    addToTeam({ name, url });
                }}
                className={`mt-3 w-full py-2 rounded-lg font-bold text-xs transition-colors ${
                    isAlreadyInTeam 
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                    : 'bg-yellow-500 hover:bg-yellow-400 text-slate-900'
                }`}
            >
                {isAlreadyInTeam ? 'ON THE TEAM' : 'ADD TO TEAM'}
            </button>
        </div>
    )
}