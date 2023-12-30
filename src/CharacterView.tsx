import { useFetchJson } from "./hooks.ts";
import { bold } from "./CharacterView.module.css";
import type Character from "./Character.ts";

interface Props {
  id: number
}

export default function CharacterView({ id }: Props) {
  let data = useFetchJson<Character>("http://localhost:5065/character/" + id);

  return (<div>
    <span className={bold}>character id {id}</span><br />
    {data.loading ?
      <p>Loading...</p> :
      <div>
        <p>Player: {data.result.playerName}</p>
        <p>Character: {data.result.characterName}</p>
      </div>}
  </div>);
}

