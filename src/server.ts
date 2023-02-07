import "dotenv/config";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import "@database/data-source";
import "@shared/container";

import swaggerUi from "swagger-ui-express";

import { AppError } from "@errors/AppError";

import cors from "cors";

import generalRoutes from "./routes/routes";
import swaggerFile from "./swagger.json";

process.env.TZ = "America/Sao_Paulo";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(generalRoutes);

const date = new Date();
console.log(date.toLocaleTimeString("pt-BR"));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error = ${err.message}`,
    });
  }
);

app.listen(3000, () => console.log("Server sis running!"));
