import { ZodError } from "zod";
import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import superjson from "superjson";

// Created for each request
export const createContext = ({
  req,
}: trpcExpress.CreateExpressContextOptions) => {
  // Pega a key "cpf" do headers e coloca no contexto tRPC
  return {
    cpf: req.headers.cpf,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error?.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error?.cause?.flatten()
            : null,
      },
    };
  },
});

// Obriga CPF
export const requireCPF = t.middleware(async ({ ctx, next }) => {
  if (!ctx.cpf) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "CPF obrigatório no header",
    });
  }

  const result = await next();

  return result;
});

// v10 naming
export const router = t.router;
// export const middleware = t.middleware;
export const publicProcedure = t.procedure;
// Middleware que obriga CPF no headers
export const cpfProcedure = t.procedure.use(requireCPF);
// Merge
export const mergeRouters = t.mergeRouters;
