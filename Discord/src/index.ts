import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Client,
    GatewayIntentBits,
    GuildMember,
    ComponentType,
    APIEmbed,
} from "discord.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "./trpc";
import { cronjob } from "./crons";

type NFT = {
    name: string;
    symbol: string;
    tokenId: number;
    price: number;
};

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});

client.on("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    // sendMsg("941011407158263828", {
    //     name: "test",
    //     symbol: "TEST",
    //     tokenId: 1234,
    //     price: 6.67,
    // });
});

export const sendMsg = async (userId: string, co: NFT) => {
    const user = await client.users.fetch(userId);

    const confirm = new ButtonBuilder()
        .setLabel("Buy")
        // .setURL("https://sniffer_ethbcn.netlify.app")
        .setURL("https://google.com")
        .setStyle(ButtonStyle.Link);

    const reduction = 27;
    const url =
        "https://ipfs.io/ipfs/QmNiGCB6ChKCv9MhcZJEktiwxYGdrKaTPAXz9Xa3wiN6DL";
    const embed: APIEmbed = {
        title: `${co.symbol} #${co.tokenId}`,
        description: `${reduction}% below floor price`,
        image: { url },
    };

    await user.send({
        content: `Are you sure you want to buy ${co.name} for : ${co.price} XDC?`,
        components: [{ components: [confirm], type: ComponentType.ActionRow }],
        embeds: [embed],
    });
};

export const sendXDCMsg = async (
    userId: string,
    usd: number,
    usd_market_cap: number,
    usd_24h_vol: number,
    usd_24h_change: number
) => {
    const opts = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
    const user = await client.users.fetch(userId);
    const embed: APIEmbed = {
        title: `XDC Price: $${usd} (${usd_24h_change.toFixed(2)}%)`,
        description: `Market cap: $${usd_market_cap.toLocaleString(
            undefined,
            opts
        )}\nVolume: $${usd_24h_vol.toLocaleString(undefined, opts)}`,
    };

    await user.send({
        embeds: [embed],
    });
    // await user.send(
    //     `XDC price is $${usd} (${usd_24h_change.toFixed(
    //         2
    //     )}%)\nMarket cap: $${usd_market_cap.toLocaleString(
    //         undefined,
    //         opts
    //     )}\nVolume: $${usd_24h_vol.toLocaleString(undefined, opts)}`
    // );
};

export const sendXRC20Msg = async (
    userId: string,
    symbol: string,
    usd: number,
    usd_market_cap: number,
    usd_24h_vol: number,
    usd_24h_change: number
) => {
    const opts = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
    const user = await client.users.fetch(userId);
    await user.send(
        `${symbol} ($) price is $${usd} (${usd_24h_change.toFixed(
            2
        )}%)\nMarket cap: $${usd_market_cap.toLocaleString(
            undefined,
            opts
        )}\nVolume: $${usd_24h_vol.toLocaleString(undefined, opts)}`
    );
};

// Start TRPC server

const app = express();
app.use(cors());
app.use("/trpc", expressMiddleware);

// Health check
app.get("/", (req, res) => {
    console.log(req.ip);
    res.send("Hello World!");
});

const port = 3001;
app.listen(port);
console.log("Listening on port", port);

cronjob.start();

client.login(process.env.DISCORD_TOKEN);
