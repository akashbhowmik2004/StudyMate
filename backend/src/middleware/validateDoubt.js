import { createDoubtSchema } from "../validators/doubtValidator.js";

export const validateCreateDoubt = (req, res, next) => {
  const { error } = createDoubtSchema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.details[0].message.replace(/"/g, ""),
    });
  }

  next();
};
