import React from "react";
import "./index.css";
import Collection from "../../components/Collection";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <div className=""></div>
      <div className="collections-container">
        <div className="top-collections-container">
          <h3>Trendy Collections</h3>
          <div className="collection">
            <span>1</span>
            <img
              src="https://ik.imagekit.io/thearmors/thumbnails/prime_YUL7jg_Xx.jpeg"
              alt="illustration"
            />
            <span>PrimeNumbers</span>
          </div>
          <div className="collection">
            <span>2</span>
            <img
              src="https://ik.imagekit.io/primenumbers/marketplace/50/0x692f00c28437e66f99aca5618248b88de3791dcc/xdc692f00c28437e66f99aca5618248b88de3791dcc_OMJuccglS.jpg"
              alt="illustration"
            />
            <span>XDC Staking NFTs</span>
          </div>
          <div className="collection">
            <span>3</span>
            <img
              src="https://ik.imagekit.io/primenumbers/marketplace/50/0xb725ce2e90b0fdfb73045abccb3f4618f5e773ec/QXCi837l_400x400_KDprBG4NR.jpg"
              alt="illustration"
            />
            <span>ZeroFeePunks</span>
          </div>
          <div className="collection">
            <span>4</span>
            <img
              src="https://ik.imagekit.io/primenumbers/marketplace/50/0x295a7ab79368187a6cd03c464cfaab04d799784e/logox_P1RDQaVTP.png"
              alt="illustration"
            />
            <span>XDC Web3 Domains</span>
          </div>
          <Link to={"/collection"} className="view-more">
            View more
          </Link>
        </div>
        <div className="top-collections-container">
          <h3>Top Collections</h3>
          <div className="collection">
            <span>1</span>
            <img
              src="https://ik.imagekit.io/primenumbers/marketplace/50/0x692f00c28437e66f99aca5618248b88de3791dcc/xdc692f00c28437e66f99aca5618248b88de3791dcc_OMJuccglS.jpg"
              alt="illustration"
            />
            <span>XDC Staking NFTs</span>
          </div>
          <div className="collection">
            <span>2</span>
            <img
              src="https://ik.imagekit.io/thearmors/thumbnails/prime_YUL7jg_Xx.jpeg"
              alt="illustration"
            />
            <span>PrimeNumbers</span>
          </div>
          <div className="collection">
            <span>3</span>
            <img
              src="https://ik.imagekit.io/primenumbers/marketplace/50/0xb725ce2e90b0fdfb73045abccb3f4618f5e773ec/QXCi837l_400x400_KDprBG4NR.jpg"
              alt="illustration"
            />
            <span>ZeroFeePunks</span>
          </div>
          <div className="collection">
            <span>4</span>
            <img
              src="https://ik.imagekit.io/primenumbers/marketplace/50/0x295a7ab79368187a6cd03c464cfaab04d799784e/logox_P1RDQaVTP.png"
              alt="illustration"
            />
            <span>XDC Web3 Domains</span>
          </div>
          <Link to={"/collection"} className="view-more">
            View more
          </Link>
        </div>
      </div>
      {/* <Link to="/collection">Collection</Link> */}
    </div>
  );
};

export default Home;
