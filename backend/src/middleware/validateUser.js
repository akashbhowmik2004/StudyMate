import { updatedProfileSchema } from "../validators/userValidator.js";

export const validateProfile = (req,res,next) => {
    const { error } = updatedProfileSchema.validate(req.body);
    
        if (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                message: error.details.map((message)=> {
                    return message.message
                })
            });
        }
    
        next();
}