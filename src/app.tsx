import React, { useState, useCallback } from "react";
import { Web3ModalContext } from "./contexts/Web3ModalProvider";
import "./app.css";

const App: React.FC = () => {
    const { account, connect, disconnect } = React.useContext(Web3ModalContext);

    const handleConnectWallet = useCallback(() => {
        connect();
    }, [connect]);

    const handleDisconnectWallet = useCallback(() => {
        disconnect();
    }, [disconnect]);

    function ellipseAddress(address: string = "", width: number = 4): string {
        return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
    }

    return (
        <main>
            <header>
                {!account ? (
                    <div className={"connect"} onClick={handleConnectWallet}>
                        CONNECT WALLET
                    </div>
                ) : (
                    <div className={"connect"} onClick={handleDisconnectWallet}>
                        {ellipseAddress(account)}
                    </div>
                )}
            </header>
            <a href="https://discord.com/api/oauth2/authorize?client_id=1127156751255478385&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=token&scope=identify">
                <button>
                    <span>Sign in with Discord</span>
                </button>
            </a>
            <div className="app"></div>
        </main>
    );
};

export default App;
