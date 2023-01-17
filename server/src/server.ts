import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import cors from "cors";
import { createContext } from "./router/context";

const app = express();

app.use([
  cors({
    origin: ["http://localhost:3000"],
  }),
  express.json(),
]);

const runApp = async () => {
  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: createContext,
    })
  );
};

runApp();

app.listen(4000, () => console.log("tRPC is running!"));
