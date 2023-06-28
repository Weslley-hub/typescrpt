import { NextFunction, Request, Response, } from "express";
import { ApiError } from "../helpers/api-erros";

export const middlewareError = (
	error: Error & Partial<ApiError>,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) => {
	const statusCode = error.statusCode ?? 500;
	const message = error.statusCode ? error.message : "Interno Server Error";
	return res.status(statusCode).json(message);
};