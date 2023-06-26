import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { ChannelController } from "./controllers/ChannelController";

const routes = Router();

routes.post("/api/user", new UserController().create);
routes.post("/api/channel", new ChannelController().create);
routes.post("/api/channel/:idChannel/create", new ChannelController().createVideo);

export default routes;