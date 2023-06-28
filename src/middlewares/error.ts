import { NextFunction, Request, Response, } from "express";

export const middlewareError = (
	error: Error,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) => {
	console.log(error);
	return res.status(500).json("Middleware de error: ");
};