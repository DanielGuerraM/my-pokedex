interface PokemonCardProps {
    readonly name: string;
    readonly url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
    const id = url.match(/\/pokemon\/(\d+)\//)?.[1];
    const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (     
        <div
            key={id}
            className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-yellow-400 transition-all cursor-pointer capitalize text-center"
        >
            <p className="font-semibold">{name}</p>
            <img
                src={urlImage}
                alt={name}
                className="mx-auto w-24 h-24"
            />
            <p className="font-semibold">#{id}</p>
        </div>
    )
}