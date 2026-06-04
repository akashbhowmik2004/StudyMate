import Doubt from "../models/doubt.js";
import {reject} from "bcrypt/promises.js";

export const getDoubt = async (req, res) => {
    const {id} = req.params;
    try {
        const doubt = await Doubt.findById(id);
        if (!doubt) {
            return res.status(404).json({
                success: false,
                message: "No post found"
            })
        }
        console.log(req.user);
        res.status(200).json({
            success: true,
            doubt
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const postDoubts = async (req, res) => {
    const {title, content} = req.body;
    const userId = req.user.id;
    try {
        const newDoubt = new Doubt({
            title,
            content,
            userId
        })
        await newDoubt.save();
        res.status(201).json({
            success: true,
            message: "Doubt created successfully",
            newDoubt
        })
    } catch (err) {
        console.log(err);
    }
}

export const editDoubt = async (req,res) => {
    const {id} = req.params;
    try {
        const doubt = await Doubt.findById(id);

        if(!doubt){
            res.status(404).json({
                status: false,
                message: "Doubt not found"
            })
        }

        if(doubt.userId !== req.user.id){
            res.status(404).json({
                status: false,
                message: "You are not allowed"
            })
        }
        const updatedDoubt = await doubt.updateOne({$set: req.body});
        res.status(200).json({
            success: true,
            message: "Doubt updated successfully",
            updatedDoubt
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const deleteDoubt = async (req, res) => {
    const {id:doubtId} = req.params;
    console.log(doubtId);
    try {
        const doubt = await Doubt.findByIdAndDelete(doubtId);

        if (!doubt) {
            return res.status(404).json({
                success: false,
                message: "Can't find doubt"
            })
        }

        res.status(200).json({
            success: true,
            message: "Doubt deleted successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

