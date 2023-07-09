import React, { useState } from "react";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import Collection from "./components/Collection";
import { DiscordUserContext } from "./context/discordContext";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Web3ModalProvider from "./contexts/Web3ModalProvider";
import { api } from "./utils/config";
import { trpc } from "./utils/trpc";

const App: React.FC = () => {
  const [discordUser, setDiscordUser] = useState("");
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
        <DiscordUserContext.Provider value={{ discordUser, setDiscordUser }}>
          <Web3ModalProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Collection />} />
                <Route path="/auth/discord" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </BrowserRouter>
          </Web3ModalProvider>
        </DiscordUserContext.Provider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
