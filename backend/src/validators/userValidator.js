import Joi from "joi";
export const updatedProfileSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).messages({
    "string.empty": "Username is required",
    "string.alphanum": "Username can only contain letters and numbers",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username cannot exceed 30 characters",
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

    newEmail: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
        }),

  currentPassword: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .messages({
      "string.empty": "Current password is required",
      "string.pattern.base":
        "Password can only contain letters and numbers and must be 6-30 characters long",
    }),
  newPassword: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .messages({
      "string.empty": "New password is required",
      "string.pattern.base":
        "Password can only contain letters and numbers and must be 6-30 characters long",
    }),

  confirmNewPassword: Joi.string().valid(Joi.ref("newPassword")).messages({
    "any.only": "Passwords do not match",
    "string.empty": "Please confirm your password",
  }),
});
