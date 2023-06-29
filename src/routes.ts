import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { ChannelController } from "./controllers/ChannelController";
import { LoginController } from "./controllers/LoginController";

const routes = Router();

routes.get("/api/user", new UserController().listUser);
routes.get("/api/user/channel", new UserController().listChannel);
routes.get("/api/user/channel/videos", new ChannelController().listChannelVideos);

routes.post("/api/user/login", new LoginController().login);

routes.post("/api/user", new UserController().create);
routes.post("/api/channel/:idUser/create", new ChannelController().create);
routes.post("/api/video/:idChannel/create", new ChannelController().createVideo);

export default routes;