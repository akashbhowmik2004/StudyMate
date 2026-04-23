import Post from "../models/posts.js"
import User from "../models/users.js";
import Comment from "../models/comment.js";

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

export const addComments = async(req,res)=>{
    const {comment} = req.body;
    const {id} = req.params;
    console.log(id);
    
    try {
        if (!comment || !comment.trim()) {
            return res.status(400).json({ message: "Comment is required" });
        }

        const comments = await Comment.create({post:id,user:req.user.id,comment: comment.trim()});
        await Post.findByIdAndUpdate(id, { $inc: { commentCount: 1 } });
        console.log(comments);

        return res.status(201).json(comments);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Failed to add comment" });
    }
}