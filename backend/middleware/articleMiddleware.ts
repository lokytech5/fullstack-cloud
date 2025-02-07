import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateRequest =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        message: "Validation error",
        errors: error.details.map((err) => err.message),
      });
      return;
    }

    next();
  };
