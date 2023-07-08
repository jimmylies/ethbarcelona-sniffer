import { useContext, useEffect, useState } from "react";
import "./index.css";
import { DiscordUserContext } from "../context/discordContext";

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
          <span>DISCORD USERNAME: {discordUser}</span>
        ) : (
          <a href="https://discord.com/api/oauth2/authorize?client_id=1127156751255478385&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=token&scope=identify">
            <button>
              <span>Sign in with Discord</span>
            </button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
