import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { channelRepository } from "../repositories/channelRepository";
import { BabRequestError} from "../helpers/api-erros";

export class UserController {

	async create(req: Request, res: Response) {
		const { name, email, age, password } = req.body;

		if(!name) {
			throw new BabRequestError("O nome é obrigatorio");
		}

		const newUser = userRepository.create({
			name,
			email,
			age,
			password
		});

		await userRepository.save(newUser);
		return res.status(201).json(newUser);
	}

	async listUser(req: Request, res:Response) {
		const users = await userRepository.find({
			relations: {
				channels: true
			}
		});

		return res.json(users);
	}

	async listChannel(req: Request, res:Response) {
		const channels = await channelRepository.find();

		return res.json(channels);
	}
}