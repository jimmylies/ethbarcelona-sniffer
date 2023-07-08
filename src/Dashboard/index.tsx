import { useEffect, useState } from "react";

const Dashboard = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = fragment.get("access_token");
        const tokenType = fragment.get("token_type");

        if (!accessToken || !tokenType) {
            window.location.href = "/";
        }

        fetch("https://discord.com/api/users/@me", {
            headers: {
                authorization: `${tokenType} ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.username);
                setUsername(data.username);
            });
    }, [window.location.hash]);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Username: {username}</p>
        </div>
    );
};

export default Dashboard;
