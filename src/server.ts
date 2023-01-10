import express from "express";

import "@database/data-source";
import "@shared/container";

import { generalRoutes } from "./routes/routes";

const app = express();

app.use(express.json());

app.use(generalRoutes);

app.listen(3000, () => console.log("Server sis running!"));
