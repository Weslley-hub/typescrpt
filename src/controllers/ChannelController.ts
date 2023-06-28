import { Response, Request } from "express";
import { channelRepository } from "../repositories/channelRepository";
import { videoRepository } from "../repositories/videoRepository";
import { userRepository } from "../repositories/userRepository";

export class ChannelController {

	async create(req: Request, res: Response) {
		const { name } = req.body;
		const { idUser } = req.params;

		if (!name) {
			return res.status(400).json({ message: "O nome é obrigatorio" });
		}

		try {

			const user = await userRepository.findOneBy({ id: Number(idUser) });

			if (!user) {
				return res.status(404).json({ message: "Error canal" });
			}

			const newChannel = channelRepository.create({
				name,
				user
			});

			await channelRepository.save(newChannel);

			return res.status(201).json(newChannel);

		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Internal Server Error" });
		}
	}

	async createVideo(req: Request, res: Response) {
		const { title, description } = req.body;
		const { idChannel } = req.params;

		try {
			const channel = await channelRepository.findOneBy({ id: Number(idChannel) });

			if (!channel) {
				return res.status(404).json({ message: "Error video" });
			}

			const newVideo = videoRepository.create({
				title,
				description,
				channel
			});

			await videoRepository.save(newVideo);

			return res.status(201).json(newVideo);

		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Intenal Server Error" });
		}
	}

	async listChannelVideos(req: Request, res:Response) {
		try {
			const channel = await channelRepository.find({
				relations: {
					videos: true,
				}
			});

			return res.json(channel);

		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

}