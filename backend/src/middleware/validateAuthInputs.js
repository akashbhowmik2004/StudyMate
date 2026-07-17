import {loginSchema, registerSchema} from "../validators/authValidator.js";

export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      field: error.details[0].path[0],
      message: error.details.map((message) => {
        return message.message;
      }),
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      field: error.details[0].path[0],
      message: error.details.map((message) => {
        return message.message;
      }),
    });
  }

  next();
};
