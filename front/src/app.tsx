import React from "react";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import Collection from "./components/Collection";
import { api } from "./utils/config";
import { trpc } from "./utils/trpc";

const App: React.FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });
    const trpcClient = trpc.createClient({
        links: [
            httpBatchLink({
                url: api,
            }),
        ],
    });

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <main>
                    <div className="app">
                        <Collection />
                    </div>
                </main>
            </QueryClientProvider>
        </trpc.Provider>
    );
};

export default App;
