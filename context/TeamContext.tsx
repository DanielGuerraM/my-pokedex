"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface TeamContextType {
    team: any[];
    addToTeam: (pokemon: any) => void;
    removeFromTeam: (name: string) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
    const [team, setTeam] = useState<any[]>([]);

    const addToTeam = (pokemon: any) => {
        if(team.length < 6 && !team.find(p => p.name === pokemon.name)) {
            setTeam([...team, pokemon])
        } else {
            alert("El equipo esta completo, o el pokemon hace parte de tu equipo!")
        }
    };

    const removeFromTeam = (name: string) => {
        setTeam(team.filter(p => p.name !== name))
    };

    return (
        <TeamContext.Provider value={{ team, addToTeam, removeFromTeam}}>
            {children}
        </TeamContext.Provider>
    )
}

export const useTeam = () => {
    const context = useContext(TeamContext);

    if(!context) throw new Error("useTeam must be used within a TeamProvider");
    return context;
}