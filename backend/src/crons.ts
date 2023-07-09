import cron from "node-cron";
import { prisma } from "./trpc";
import { sendMsg, sendXDCMsg, sendXRC20Msg } from "./index";

const sendNotifications = async () => {
    const xdcRegisteredUsers = await prisma.user.findMany({
        where: {
            xdcRegistered: true,
        },
    });
    const xdcPrice = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=xdce-crowd-sale&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true"
    )
        .then((res) => res.json())
        .then((res) => {
            const { usd, usd_market_cap, usd_24h_vol, usd_24h_change } =
                res["xdce-crowd-sale"];
            return { usd, usd_market_cap, usd_24h_vol, usd_24h_change };
        });

    for (const user of xdcRegisteredUsers) {
        sendXDCMsg(
            user.discordId,
            xdcPrice.usd,
            xdcPrice.usd_market_cap,
            xdcPrice.usd_24h_vol,
            xdcPrice.usd_24h_change
        );
    }

    const xrc20Tokens = await prisma.xRC20Wish.findMany({
        distinct: ["symbol"],
    });

    for (const token of xrc20Tokens) {
        const price = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${token.address}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
        )
            .then((res) => res.json())
            .then((res) => {
                const { usd, usd_market_cap, usd_24h_vol, usd_24h_change } =
                    res[token.address.toLowerCase()];
                return { usd, usd_market_cap, usd_24h_vol, usd_24h_change };
            });
        const registeredUsers = await prisma.user.findMany({
            where: {
                xrc20Watchlist: {
                    some: {
                        address: token.address,
                    },
                },
            },
            select: {
                discordId: true,
            },
        });

        for (const user of registeredUsers) {
            sendXRC20Msg(
                user.discordId,
                token.symbol,
                price.usd,
                price.usd_market_cap,
                price.usd_24h_vol,
                price.usd_24h_change
            );
        }
    }
};

// schedule every hour
const timeInterval = "* 0 * * * *";

export const cronjob = cron.schedule(timeInterval, sendNotifications, {
    scheduled: false,
});

// schedule every 30 seconds
// cron.schedule("*/30 * * * * *", async () => {
//     console.log("running a task every 30 seconds");
// });
