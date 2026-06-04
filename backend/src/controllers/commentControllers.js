import Comment from "../models/comment.js"

export const getComment = async(req,res) =>{
    const {id} = req.params;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "No comment found"
            })
        }

        res.status(200).json({
            success: true,
            comment
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const commentDoubt = async (req,res) => {
    const { id } = req.params;
    const { content } = req.body;
    try{
        if(!content || content == " "){
            return res.status(400).json({
                success: false,
                message: "Please enter a content"
            })
        }
        const newComment = new Comment({
            postId: id,
            userId: req.user.id,
            text: content
        })
        await newComment.save();
        res.status(201).json({
            success: true,
            message: "Comment successful",
            newComment
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const deleteComment = async (req,res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);

        if(!comment){
            return res.status(404).json({
                success: false,
                message: "Can't find comment"
            })
        }
        if(comment.userId.toString() !== req.user.id){
            return res.status(403).json({
                success: false,
                message: "You can't delete this comment"
            })
        }
        await Comment.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}