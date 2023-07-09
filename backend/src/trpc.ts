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
                discordId: z.string(),
                xrc721Watchlist: z.array(
                    z.object({
                        address: z.string(),
                        symbol: z.string(),
                        price: z.number(),
                    })
                ),
                xrc20Watchlist: z.array(
                    z.object({
                        address: z.string(),
                        symbol: z.string(),
                        price: z.number(),
                    })
                ),
                xdcRegistered: z.boolean(),
            })
        )
        .mutation(({ input }) => {
            const xrc721Watchlist = {
                createMany: {
                    data: input.xrc721Watchlist,
                },
            };
            const xrc20Watchlist = {
                createMany: {
                    data: input.xrc20Watchlist,
                },
            };
            return prisma.user.upsert({
                where: {
                    discordId: input.discordId,
                },
                create: {
                    discordId: input.discordId,
                    xrc721Watchlist,
                    xrc20Watchlist,
                    xdcRegistered: input.xdcRegistered,
                },
                update: {
                    xrc721Watchlist,
                    xrc20Watchlist,
                    xdcRegistered: input.xdcRegistered,
                },
            });
        }),
    getWatchlist: t.procedure.input(z.string()).query(({ input }) => {
        console.log(input);
        return prisma.user.findUnique({
            where: {
                discordId: input,
            },
            include: {
                xrc721Watchlist: true,
                xrc20Watchlist: true,
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
