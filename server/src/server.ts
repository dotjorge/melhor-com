import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.send("Ola");
});

app.listen(3030, () => console.log("Servidor está rodando"));
