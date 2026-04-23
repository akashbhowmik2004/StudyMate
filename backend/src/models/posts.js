import mongoose from "mongoose";
import User from "./users.js"

const postSchema = new mongoose.Schema(
  {
    community: {
      type: String,
      required : true,
    },
    content: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required : true,
      ref: "User",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    commentCount: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;