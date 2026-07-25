import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
    publicId: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      default: "text",
    }
  },
  { timestamps: true },
);

export default mongoose.model("Note", noteSchema);
