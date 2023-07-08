import React from "react";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";
import "./index.css";

const Collection = () => {
  const { account } = React.useContext(Web3ModalContext);

  return (
    <div className="Collection">
      <h1>Collection</h1>
    </div>
  );
};

export default Collection;
