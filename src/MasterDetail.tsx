import styles from "./MasterDetail.module.css";
import classNames from "classnames";
import { useState } from "react";
import { useFetchJson } from "./hooks.ts";
import CharacterView from "./CharacterView.tsx";
import type Character from "./Character.ts";

export default function MasterDetail() {
    let list = useFetchJson<Character[]>("http://localhost:5065/character/list");
    let [selected, setSelected] = useState<Character | null>(null);

    if (list.loading) {
        return <div className={styles.layout}>
            <div className={styles.master}>Loading...</div>
        </div>;
    } else {
        let charsByPlayer = list.result.reduce(function (acc, x) {
            acc[x.playerName] = acc[x.playerName] || [];
            acc[x.playerName].push(x);
            return acc;
        }, Object.create(null));

        return <div className={styles.layout}>
            <div className={styles.master}>
                {Object.getOwnPropertyNames(charsByPlayer).map(p =>
                    <div className={styles.playerCharacters}>
                        <div>{p}</div>
                        {charsByPlayer[p].map((c: Character) => (selected == c
                            ? <a className={classNames(styles.characterLink, styles.selectedLink)} key={c.id} onClick={() => setSelected(c)}>{c.characterName}</a>
                            : <a className={styles.characterLink} key={c.id} onClick={() => setSelected(c)}>{c.characterName}</a>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.detail}>
                {selected == null ? <></> : <CharacterView id={selected.id} />}
            </div>
        </div>;
    }
}

