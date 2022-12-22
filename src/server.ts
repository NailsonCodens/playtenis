import express from "express";

import { generalRoutes } from "./routes/routes";

const app = express();

app.use(express.json());

app.use(generalRoutes);

app.listen(3000, () => console.log("OK"));
