import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { z } from "zod";
import { PrismaClient, type Prisma } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ["error"],
});

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({
    req,
    res,
    prisma,
});
export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
    addToWatchlist: t.procedure
        .input(
            z.object({
                address: z.string(),
                symbol: z.string(),
                price: z.number(),
                discordId: z.string(),
            })
        )
        .mutation(({ input }) => {
            return prisma.user.upsert({
                where: {
                    discordId: input.discordId,
                },
                create: {
                    discordId: input.discordId,
                    watchlist: {
                        create: {
                            address: input.address,
                            symbol: input.symbol,
                            below: input.price,
                        },
                    },
                },
                update: {
                    watchlist: {
                        create: {
                            address: input.address,
                            symbol: input.symbol,
                            below: input.price,
                        },
                    },
                },
            });
        }),
});

export const expressMiddleware = trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
});

// export type definition of API
export type AppRouter = typeof appRouter;
