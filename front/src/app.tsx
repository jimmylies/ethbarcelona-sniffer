import React, { useState } from "react";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { DiscordUserContext } from "./context/discordContext";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Web3ModalProvider from "./contexts/Web3ModalProvider";
import { api } from "./utils/config";
import { trpc } from "./utils/trpc";
import Footer from "./components/Footer";
import NFT from "./NFT";
import Home from "./pages/Home";
import Collection from "./components/Collection";

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
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/auth/discord" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/:tokenId" element={<NFT />} />
              </Routes>
            </BrowserRouter>
            <Footer />
          </Web3ModalProvider>
        </DiscordUserContext.Provider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
