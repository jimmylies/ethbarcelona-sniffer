import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import { DiscordUserContext } from "../../context/discordContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { discordUser, setDiscordUser } = useContext(DiscordUserContext);

  useEffect(() => {
    if (discordUser) {
      setIsConnected(true);
      return;
    }
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = fragment.get("access_token");
    const tokenType = fragment.get("token_type");

    setIsConnected(!!accessToken && !!tokenType);

    fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.username);
        setDiscordUser(data.username);
      });
  }, [window.location.hash]);

  return (
    <div className="Dashboard">
      <div className="header-dashboard">
        <h2>My profile</h2>
        {isConnected ? (
          <span>DISCORD ID: {discordUser}</span>
        ) : (
          <a href="https://discord.com/api/oauth2/authorize?client_id=1127156751255478385&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=token&scope=identify">
            Sign in with Discord <FontAwesomeIcon icon={faDiscord} />
          </a>
        )}
      </div>
      <div className="sniping">
        <span>NFT Sniping</span>
        <div className="personal-notifications">
          <span className="collection-name">
            Collection&apos;s name: PrimeNumbers
          </span>

          {[
            { rank: "15", price: NaN },
            { rank: "20", price: 200 },
            { rank: "5", price: 1000 },
          ].map((alert, index) => {
            return (
              <div className="alert" key={index}>
                <span>Alert #{index + 1}</span>
                <span>Rank: {alert.rank}</span>
                <span>
                  Price: {!isNaN(alert.price) ? alert.price : "not defined"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="personal-notifications">
        <span className="collection-name">History NFT Sniping</span>
        <div className="table">
          <div className="header-table">
            {["NFT COLLECTION", "NFT", "RANK", "PRICE", "DATE"].map(
              (header, index) => {
                return <div key={index}>{header}</div>;
              }
            )}
          </div>
          <div className="content-table">
            {[
              {
                collection: "PrimeNumbers",
                nft: "PrimeNumbers #26849",
                rank: "3",
                price: "14.500 XDC",
                date: "10min ago",
                url: "https://ik.imagekit.io/primenumbers/marketplace/50/0xf87f7dd4e47dd5bcac902c381ea0d2730db5c6ad/1.jpg",
              },
              {
                collection: "PrimeNumbers",
                nft: "PrimeNumbers #2897",
                rank: "10",
                price: "14.500 XDC",
                date: "1h ago",
                url: "https://ik.imagekit.io/primenumbers/marketplace/50/0xf87f7dd4e47dd5bcac902c381ea0d2730db5c6ad/2.png",
              },
              {
                collection: "PrimeNumbers",
                nft: "PrimeNumbers #17573",
                rank: "15",
                price: "14.500 XDC",
                date: "1h ago",
                url: "https://ik.imagekit.io/primenumbers/marketplace/50/0xf87f7dd4e47dd5bcac902c381ea0d2730db5c6ad/5.jpg",
              },
              {
                collection: "PrimeNumbers",
                nft: "PrimeNumbers #2777",
                rank: "8",
                price: "14.500 XDC",
                date: "2h ago",
                url: "https://ik.imagekit.io/primenumbers/marketplace/50/0xf87f7dd4e47dd5bcac902c381ea0d2730db5c6ad/6.jpg",
              },
            ].map((row, index) => {
              return (
                <div className="row" key={index}>
                  <div>{row.collection}</div>
                  <div>
                    {row.nft}
                    <img src={row.url} />
                  </div>
                  <div>{row.rank}</div>
                  <div>{row.price}</div>
                  <div>{row.date}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="personal-notifications">
        <span className="collection-name">History Alerts</span>
        <div className="table-XDC">
          <div className="header-table">
            {["TOKEN TYPE", "TOKEN", "PRICE", "DATE"].map((header, index) => {
              return <div key={index}>{header}</div>;
            })}
          </div>
          <div className="content-table">
            {[
              {
                type: "XRC20",
                token: "XDC",
                price: "$0.040",
                date: "2min ago",
              },
              {
                type: "XRC20",
                token: "XDC",
                price: "$0.045",
                date: "12min ago",
              },
              {
                type: "XRC20",
                token: "XDC",
                price: "$0.041",
                date: "18min ago",
              },
              {
                type: "XRC721",
                token: "PrimeNumbers #26849",
                price: "17.000 XDC",
                date: "20min ago",
              },
            ].map((row, index) => {
              return (
                <div className="row" key={index}>
                  <div>{row.type}</div>
                  <div>
                    {row.token}
                    {row.type === "XRC721" && (
                      <img src="https://ik.imagekit.io/primenumbers/marketplace/50/0xf87f7dd4e47dd5bcac902c381ea0d2730db5c6ad/1.jpg" />
                    )}
                  </div>
                  <div>{row.price}</div>
                  <div>{row.date}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
