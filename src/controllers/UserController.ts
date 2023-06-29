import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { channelRepository } from "../repositories/channelRepository";
import { BabRequestError } from "../helpers/api-erros";
import bcrypt from "bcrypt";

export class UserController {

	async create(req: Request, res: Response) {
		const { name, email, age, password } = req.body;

		if (!name || !password || !email) {
			throw new BabRequestError("Todos os campos são obrigatório");
		}

		const userExists = await userRepository.findOneBy({ email });

		if (userExists) {
			throw new BabRequestError("O endereço de e-mail já esta cadastrado");
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = userRepository.create({
			name,
			email,
			age,
			password: hashPassword
		});

		await userRepository.save(newUser);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...user } = newUser;
		return res.status(201).json(user);
	}

	async listUser(req: Request, res: Response) {
		const users = await userRepository.find({
			relations: {
				channels: true
			}
		});

		return res.json(users);
	}

	async listChannel(req: Request, res: Response) {
		const channels = await channelRepository.find();

		return res.json(channels);
	}
}