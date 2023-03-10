import { phoneRoutes } from "./phone/phone.routes";
import { mergeRouters, router } from "./context";
import { inferRouterOutputs, inferRouterInputs } from "@trpc/server";

export const appRouter = mergeRouters(phoneRoutes);
// export const appRouter = t.router({
//   getPhones: publicProcedure.query(({ input }) => {
//     return {};
//   }),
// });

// Prefix phones, but what can't expose the url /phones/get
// export const appRouter = router({
//   phones: phoneRoutes,
// });

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
