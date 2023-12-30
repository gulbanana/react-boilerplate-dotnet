import { useEffect, useState } from "react";

type Fetched<T> = { loading: true, result: undefined } | { loading: false, result: T };

export function useFetchJson<T>(endpoint: string): Fetched<T> {
    let [loading, setLoading] = useState(true);
    let [data, setData] = useState<T | null>(null);

    useEffect(() => {
        (async () => {
            let response = await fetch(endpoint);
            let json = await response.json();
            setData(json);
            setLoading(false);
        })();
    }, [endpoint]);

    if (data) {
        return loading ? { loading, result: undefined } : { loading, result: data };
    } else {
        return { loading: true, result: undefined };
    }
}