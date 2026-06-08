import { registerSchema } from "../validators/authValidator.js";

export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.details.map((message) => {
        return message.message;
      }),
    });
  }

  next();
};
