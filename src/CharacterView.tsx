import { useFetchJson } from "./hooks.ts";
import { header } from "./CharacterView.module.css";
import type Character from "./Character.ts";

interface Props {
  id: number
}

export default function CharacterView({ id }: Props) {
  let data = useFetchJson<Character>("http://localhost:5065/character/" + id);

  return (<div>{data.loading
    ? <p className={header}>Loading...</p>
    : <>
      <p className={header}>{data.result.characterName}</p>
      {data.result.stats.map(stat => <p>{stat.name}: {stat.value}</p>)}
    </>
  }</div>);
}

