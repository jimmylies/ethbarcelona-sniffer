import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

type Item = {
    address: string;
    secretKey: string;
    discordId: string;
    discordUsername: string;
};

const defaultData: Item[] = [];
const adapter = new JSONFileSync<Item[]>("db.json");
const db = new LowSync(adapter, defaultData);
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "get-started") {
        const existingEntry = db.data.find(
            (item) => item.discordId === interaction.user.id
        );
        if (existingEntry) {
            await interaction.reply({
                content: "Wallet already generated: " + existingEntry.secretKey,
                ephemeral: true,
            });
            return;
        }

        await interaction.reply({
            content: "Here is your secret key: ",
            ephemeral: true,
        });

        db.data.push({
            address: "account.address",
            secretKey: "account.secretKey",
            discordId: interaction.user.id,
            discordUsername: interaction.user.username,
        });
        db.write();
    }
});

client.login(process.env.DISCORD_TOKEN);
