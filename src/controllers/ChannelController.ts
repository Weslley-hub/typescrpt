import { Response, Request } from "express";
import { channelRepository } from "../repositories/channelRepository";
import { videoRepository } from "../repositories/videoRepository";
import { userRepository } from "../repositories/userRepository";
import { BabRequestError, NotFoundError } from "../helpers/api-erros";

export class ChannelController {

	async create(req: Request, res: Response) {
		const { name } = req.body;
		const { idUser } = req.params;

		if (!name) {
			throw new BabRequestError("O nome é obrigatorio");
		}

		const user = await userRepository.findOneBy({ id: Number(idUser) });

		if (!user) {
			throw new NotFoundError("Usuario não existe");
		}

		const newChannel = channelRepository.create({
			name,
			user
		});

		await channelRepository.save(newChannel);
		return res.status(201).json(newChannel);

	}

	async createVideo(req: Request, res: Response) {
		const { title, description } = req.body;
		const { idChannel } = req.params;

		const channel = await channelRepository.findOneBy({ id: Number(idChannel) });

		if (!title || !description) {
			throw new BabRequestError("Todos os campos são obrigatório");
		}

		if (!channel) {
			throw new NotFoundError("Canal não existe");
		}

		const newVideo = videoRepository.create({
			title,
			description,
			channel
		});

		await videoRepository.save(newVideo);
		return res.status(201).json(newVideo);	
	}

	async listChannelVideos(req: Request, res: Response) {
		const channel = await channelRepository.find({
			relations: {
				videos: true,
			}
		});

		return res.json(channel);	
	}
}