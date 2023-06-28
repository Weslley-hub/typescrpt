import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { channelRepository } from "../repositories/channelRepository";

export class UserController {

	async create(req: Request, res: Response) {
		const { name, email, age, password } = req.body;

		if(!name) {
			return res.status(400).json({ message: "O nome é obrigatorio"});
		}

		try {
			
			const newUser = userRepository.create({
				name,
				email,
				age,
				password
			});

			await userRepository.save(newUser);

			return res.status(201).json(newUser);

		} catch (error) {
			console.log(error);
			return res.status(500).json({message : "Internal Server Error"});
		}
	}

	async listUser(req: Request, res:Response) {
		try {
			const users = await userRepository.find({
				relations: {
					channels: true
				}
			});

			return res.json(users);

		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}

	async listChannel(req: Request, res:Response) {
		try {
			const channels = await channelRepository.find();

			return res.json(channels);

		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}
}