import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "Username is required",
            "string.alphanum": "Username can only contain letters and numbers",
            "string.min": "Username must be at least 3 characters long",
            "string.max": "Username cannot exceed 30 characters"
        }),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] }
        })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address"
        }),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,30}$/)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base":
                "Password can only contain letters and numbers and must be 6-30 characters long"
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "Passwords do not match",
            "string.empty": "Please confirm your password"
        })
});