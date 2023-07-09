import ReactDOM from "react-dom/client";
import Web3ModalProvider from "./contexts/Web3ModalProvider";
import App from "./app";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Header from "./components/Header";
import NFT from "./NFT";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Web3ModalProvider>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/auth/discord" element={<Dashboard />} />
                <Route path="/:tokenId" element={<NFT />} />
            </Routes>
        </BrowserRouter>
    </Web3ModalProvider>
);
