import Joi from "joi";
export const createDoubtSchema = Joi.object({
  title: Joi.string().required().min(3).max(30).messages({
    "string.empty": "Title is required",
    "string.alphanum": "Title can only contain letters and numbers",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 30 characters",
  }),
  content: Joi.string().required().max(120).messages({
    "string.empty": "Content is required",
    "string.alphanum": "Content can only contain letters and numbers",
    "string.min": "Content must be at least 3 characters long",
    "string.max": "Content cannot exceed 30 characters",
  }),
});
