import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import { expressHandler } from "trpc-playground/handlers/express";
import cors from "cors";

const app = express();

// React Front-end
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());

const apiEndpoint = "/trpc";
const playgroundEndpoint = "/playground";

const runApp = async () => {
  app.use(
    apiEndpoint,
    trpcExpress.createExpressMiddleware({
      router: appRouter,
    })
  );

  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint: apiEndpoint,
      playgroundEndpoint,
      router: appRouter,
    })
  );
};

runApp();

app.listen(4000, () => console.log("Servidor está rodando"));
