import { NextFunction, Request, Response } from "express";
import { UnauThorizedError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";

type JwtPayload = {
	id: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const middlewareAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers;

	if (!authorization) {
		throw new UnauThorizedError("Não autorizado");
	}

	const token = authorization.split(" ")[1];

	const { id } = jwt.verify(token, process.env.JWT_PASSWORD ?? "") as JwtPayload;

	const user = await userRepository.findOneBy({ id });

	if (!user) {
		throw new UnauThorizedError("Não autorizado");
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: _, ...loggerdUser } = user;

	// req.user = loggerdUser;

	next();
};