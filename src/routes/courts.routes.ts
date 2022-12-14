import { Router } from "express";

const courtRouter = Router();

courtRouter.get("/", (request, response) => {
  return response.status(201).json({ message: "it's ok routes courTenis" });
});

export { courtRouter };
