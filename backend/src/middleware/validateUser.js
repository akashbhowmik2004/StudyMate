import { updatedProfileSchema } from "../validators/userValidator.js";

export const validateProfile = (req, res, next) => {
  const { error } = updatedProfileSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      field: error.details[0].path[0],
      message: error.details[0].message,
    });
  }

  next();
};
