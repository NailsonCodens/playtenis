import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import "@database/data-source";
import "@shared/container";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "swagger.json";

import { AppError } from "@errors/AppError";

import generalRoutes from "./routes/routes";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(generalRoutes);

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
