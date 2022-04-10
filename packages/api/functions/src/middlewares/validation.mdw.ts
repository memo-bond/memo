import { Request, Response, NextFunction } from "express";
import { ValidateFunction } from "ajv";
import {handleError} from '../utils';

export const Validate = (validator: ValidateFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validator(req.body)) {
      const err: string = validator.errors ? validator.errors[0].message || 'Bad request' : 'Bad request';
      return handleError(res, err);
    }

    return next();
  }
}