import "./normalize.css";
import "./globals.css";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider, QueryFunctionContext, QueryKey } from "@tanstack/react-query";
import MasterDetail from "./MasterDetail";

async function defaultQuery({ queryKey }: QueryFunctionContext<QueryKey>): Promise<any> {
    const result = await fetch(`http://localhost:5065/${queryKey[0]}/${queryKey[1]}`);
    return await result.json();
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: defaultQuery,
        },
    },
});

const root = createRoot(document.getElementById('app')!);
root.render(
    <QueryClientProvider client={queryClient}>
        <MasterDetail />
    </QueryClientProvider>
);