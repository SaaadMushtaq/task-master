import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const signupValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(100).required(),
    last_name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      message: "Bad Request",
      error: error.details,
    });
    return;
  }

  next();
};

const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ message: "Bad Request", error: error.details });
    return;
  }

  next();
};

export { signupValidation, loginValidation };
