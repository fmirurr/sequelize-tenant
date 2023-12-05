const dotenv = require("dotenv");
dotenv.config();

const { connectAllDb } = require("./config/connection_manager");
const { resolve } = require("./middlewares/connection_resolver");

const userService = require('./services/user')

const express = require("express");
const bodyParser = require("body-parser");
const PORT = 8080;

const app = express();

app.set("port", PORT);
app.use(bodyParser.json());

connectAllDb();

app.use(resolve);

// API Route
app.get("/", (req, res, next) => {
  res.json({ body: "Hello multi-tenant application." });
});

app.get("/users", async (req, res, next) => {
  const users = await userService.getAll();

  res.json({ body: users });
});

app.listen(PORT, () => {
  console.log(`Express server started at port: ${PORT}`);
});
