import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const maxAge = 3 * 24 * 60 * 60;
//Create a JWT token
const createToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {
            expiresIn: maxAge
        }
    );
}
// Handle Signup
export const signup = async (req, res) => {

    const {username, email, password} = req.body;

    try {
        if (!email || !password || !username) {
            return res.status(400).json({
                success: false,
                message: "fill up all fields"
            });
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already existed"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must ne 6 character long"
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);


        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        await newUser.save();
        const token = createToken(newUser._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            newUser
        });

    } catch (err) {
        console.log(err)
        if (err.errorResponse.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }

}

// Handle Login
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credential"
            })
        }
        const token = createToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        //Spread all the details except password
        const {password: userPassword, ...otherDetails} = user._doc;

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            otherDetails
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const logout = (req,res) => {
    try{
        res.clearCookie("jwt");
        res.status(200).json({
            success: true,
            message: "Logout successfully"
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}