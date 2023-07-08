import { REST, Routes } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const commands = [
    {
        name: "get-started",
        description: "Generate a new Massa wallet with testnet tokens",
    },
];

if (!process.env.DISCORD_TOKEN)
    throw new Error("DISCORD_TOKEN must be provided.");

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        if (!process.env.APP_ID) throw new Error("APP_ID must be provided.");
        await rest.put(Routes.applicationCommands(process.env.APP_ID), {
            body: commands,
        });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
