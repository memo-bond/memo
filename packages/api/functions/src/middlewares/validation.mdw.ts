import { Request, Response, NextFunction } from "express";
import { ValidateFunction } from "ajv";

export const Validate = (validator: ValidateFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = validator(req.body);
    if (!valid) {
      return res.status(400).json(validator.errors);
    }

    return next();
  }
}