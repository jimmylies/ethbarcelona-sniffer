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

export const appRouter = t.router({});

export const expressMiddleware = trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
});

// export type definition of API
export type AppRouter = typeof appRouter;
