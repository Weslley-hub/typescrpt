import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

routes.post("/api", new UserController().create);

export default routes;