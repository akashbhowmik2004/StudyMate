
import { createNoteSchema, editNoteSchema } from "../validators/noteValidator.js";

export const validateCreateNote = (req, res, next) => {
  const { error } = createNoteSchema.validate(req.body);

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
export const validateEditNote = (req, res, next) => {
  const { error } = editNoteSchema.validate(req.body);

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
