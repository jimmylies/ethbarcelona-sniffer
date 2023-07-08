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
            <div className="app"></div>
        </main>
    );
};

export default App;
