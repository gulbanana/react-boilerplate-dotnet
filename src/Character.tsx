import { useEffect, useState } from "react";
import { bold } from "./Character.module.css";

interface Props {
  id: number
}

export default function Character({ id }: Props) {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5065/character/" + id);
      const json = await response.text();
      setData(json);
    };
    fetchData();
  }, []);

  return (<div>
    <span className={bold}>character id {id}</span><br />
    <pre>{data}</pre>
  </div>);
}

