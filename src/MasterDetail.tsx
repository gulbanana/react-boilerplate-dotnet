import styles from "./MasterDetail.module.css";
import classNames from "classnames";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CharacterView from "./CharacterView.tsx";
import type Character from "./Character.ts";

export default function MasterDetail() {
    const [selected, setSelected] = useState<Character | null>(null);
    const { isPending, error, data } = useQuery<Character[]>({
        queryKey: ["character", "list"]
    });

    if (isPending) {
        return <div className={styles.layout}>
            <div className={styles.master}>Loading...</div>
        </div>;
    }

    if (error) {
        return <div className={styles.layout}>
            <div className={styles.master}>Loading...</div>
        </div>;
    }

    let charsByPlayer = data.reduce(function (acc, x) {
        acc[x.playerName] = acc[x.playerName] || [];
        acc[x.playerName].push(x);
        return acc;
    }, Object.create(null));

    return <div className={styles.layout}>
        <div className={styles.master}>
            {Object.keys(charsByPlayer).map(p =>
                <div key={p} className={styles.playerCharacters}>
                    <div>{p}</div>
                    {charsByPlayer[p].map((c: Character) =>
                        <a key={c.id} onClick={() => setSelected(c)} className={classNames(styles.characterLink, {
                            [styles.selectedLink]: selected == c
                        })}>{c.characterName}</a>
                    )}
                </div>
            )}
        </div>
        <div className={styles.detail}>
            {selected == null ? <></> : <CharacterView id={selected.id} />}
        </div>
    </div >;
}

