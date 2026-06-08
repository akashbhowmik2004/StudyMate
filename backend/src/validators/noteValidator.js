import Joi from "joi";
const noEmojiRegex =
  /^[^\p{Extended_Pictographic}\p{Emoji_Presentation}]+$/u;
export const createNoteSchema = Joi.object({
  title: Joi.string().required().pattern(noEmojiRegex).min(3).max(30).messages({
    "string.empty": "Title is required",
    "string.alphanum": "Title can only contain letters and numbers",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 30 characters",
    "string.pattern.base": "Emojis are not allowed in title",
  }),
  content: Joi.string().required().pattern(noEmojiRegex).max(120).messages({
    "string.empty": "Content is required",
    "string.alphanum": "Content can only contain letters and numbers",
    "string.min": "Content must be at least 3 characters long",
    "string.max": "Content cannot exceed 30 characters",
    "string.pattern.base": "Emojis are not allowed in content",
  }),
});


export const editNoteSchema = Joi.object({
  title: Joi.string()
    .pattern(noEmojiRegex)
    .required()
    .messages({
      "string.pattern.base": "Emojis are not allowed in title",
    }),

  content: Joi.string()
    .pattern(noEmojiRegex)
    .required()
    .messages({
      "string.pattern.base": "Emojis are not allowed in content",
    }),
});

