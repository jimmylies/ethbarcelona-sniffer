import React, { useState } from "react";
import "./app.css";
import Collection from "./components/Collection";
import { DiscordUserContext } from "./context/discordContext";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Web3ModalProvider from "./contexts/Web3ModalProvider";

const App: React.FC = () => {
  const [discordUser, setDiscordUser] = useState("");

  return (
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
  );
};

export default App;
