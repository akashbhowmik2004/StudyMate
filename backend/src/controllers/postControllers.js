import Post from "../models/posts.js"
import User from "../models/users.js";

export const getAllPost = async(req,res)=>{
    try {
        const post = await Post.find().populate("user","name email");
        console.log(post);
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        
    }
}

export const addPost = async(req,res)=>{
    const {community,content,tags} = req.body;
    try {
        console.log(req.user);
        
        const post = await Post.create({community,content,tags,user : req.user.id});
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
    }
}