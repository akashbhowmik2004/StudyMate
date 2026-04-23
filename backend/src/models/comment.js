import mongoose from "mongoose";
import Post from "./posts.js";
import User from "./users.js";


const CommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  comment: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Comment = mongoose.model("Comment",CommentSchema);

export default Comment;
