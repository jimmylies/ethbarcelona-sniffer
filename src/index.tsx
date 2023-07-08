import ReactDOM from "react-dom/client";
import Web3ModalProvider from "./contexts/Web3ModalProvider";
import App from "./app";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Web3ModalProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/auth/discord" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    </Web3ModalProvider>
);
