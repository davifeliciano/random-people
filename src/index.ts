import * as dotenv from "dotenv";
import express from "express";
import { router } from "./routers";

dotenv.config();

const app = express();

app.use(router);

const port = Number(process.env.PORT) || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
