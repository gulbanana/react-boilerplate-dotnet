import type Stat from "./Stat.ts";

export default interface Character {
    id: number
    playerName: string,
    characterName: string,
    stats: [Stat]
}