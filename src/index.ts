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

// import { LowSync } from "lowdb";
// import { JSONFileSync } from "lowdb/node";

// type Item = {
// address: string;
// secretKey: string;
// discordId: string;
//     // discordUsername: string;
// };

// const defaultData: Item[] = [];
// const adapter = new JSONFileSync<Item[]>("db.json");
// const db = new LowSync(adapter, defaultData);

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
    sendMsg("941011407158263828", {
        name: "test",
        symbol: "TEST",
        tokenId: 1234,
        price: 6.67,
    });
});

const sendMsg = async (userId: string, co: NFT) => {
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

client.login(process.env.DISCORD_TOKEN);
