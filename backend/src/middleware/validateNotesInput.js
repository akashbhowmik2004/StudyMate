
import { createNoteSchema, editNoteSchema } from "../validators/noteValidator.js";

export const validateCreateNote = (req, res, next) => {
  const { error } = createNoteSchema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.details[0].message.replace(/"/g, ""),
    });
  }

  next();
};
export const validateEditNote = (req, res, next) => {
  const { error } = editNoteSchema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.details[0].message.replace(/"/g, ""),
    });
  }

  next();
};
