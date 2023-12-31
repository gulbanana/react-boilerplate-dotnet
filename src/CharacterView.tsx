import { useQuery } from "@tanstack/react-query";
import { header } from "./CharacterView.module.css";
import type Character from "./Character.ts";

interface Props {
  id: number
}

export default function CharacterView({ id }: Props) {
  const { isPending, error, data } = useQuery<Character>({
    queryKey: ["character", id]
  });

  if (isPending) {
    return <div>
      <p className={header}>Loading...</p>
    </div>;
  }

  if (error) {
    return <div>
      <p className={header}>Error</p>
      <p>{error.toString()}</p>
    </div>;
  }

  return <div>
    <p className={header}>{data.characterName}</p>
    {data.stats.map(stat => <p key={stat.id}>{stat.name}: {stat.value}</p>)}
  </div>;
}

