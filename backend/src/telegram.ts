import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const botToken = process.env.TELEGRAM_TOKEN;
if (!botToken) throw new Error("Missing TELEGRAM_TOKEN env var.");

const chatId = "USER_CHAT_ID"; // Replace with the chat ID of the user you want to send the message to

// Create a new bot instance
const bot = new TelegramBot(botToken, { polling: true });

// Send a private message
bot.sendMessage(chatId, "This is a private message from the bot.")
    .then(() => {
        console.log("Message sent successfully.");
    })
    .catch((error: any) => {
        // console.error("Error sending message:", error);
    });
