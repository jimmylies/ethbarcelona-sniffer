import React, { useCallback, useContext } from "react";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";
import "./index.css";
import { Link } from "react-router-dom";
import logo_transparent from "../../assets/img/logo_transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
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
    <div className="Header">
      <Link to="/">
        <img className="logo" src={logo_transparent} alt="logo" />
      </Link>
      <div className="connection-container">
        <Link to={"/dashboard"}>
          <FontAwesomeIcon icon={faUser} className="user-profile-svg" />
        </Link>
        {!account ? (
          <div className="connect" onClick={handleConnectWallet}>
            Connect wallet
          </div>
        ) : (
          <div className="connect" onClick={handleDisconnectWallet}>
            {ellipseAddress(account)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
