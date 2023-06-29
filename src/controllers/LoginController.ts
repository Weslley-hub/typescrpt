import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";
import { BabRequestError } from "../helpers/api-erros";


export class LoginController {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		const user = await userRepository.findOneBy({ email });

		if (!user) {
			throw new BabRequestError("E-mail ou senha invalido(a)");
		}

		const verifyPassword = await bcrypt.compare(password, user.password);

		if (!verifyPassword) {
			throw new BabRequestError("E-mail ou senha invalido(a)");
		}

		const token = jwt.sign({ id: user.id}, process.env.JWT_PASSWORD ?? "", {expiresIn: 60*10});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {password:_, ...userLogin} = user;

		return res.json({
			user: userLogin, 
			token: token,
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	// async getProfile(req: Request, res: Response) {
	// 	return res.json(req.user);
	// }
}