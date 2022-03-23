import { Request, Response } from "express";
import { handleSuccess } from "../utils";

export const Welcome = async (req: Request, res: Response) => {

    return handleSuccess(res, 'Welcome to Memo');
}