import Doubt from "../models/doubt.js";

export const getDoubt = async (req, res) => {
  const { id } = req.params;
  try {
    const doubt = await Doubt.findById(id);
    if (!doubt) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }
    console.log(req.user);
    res.status(200).json({
      success: true,
      doubt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllDoubts = async (req, res) => {
  try {
    const doubts = await Doubt.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    const formattedDoubts = doubts.map((doubt) => ({
      ...doubt.toObject(),

      likeCount: doubt.likes.length,

      isLiked: doubt.likes.some(
        (id) => id.toString() === req.user.id.toString(),
      ),

    }));

    res.status(200).json({
      success: true,
      doubts: formattedDoubts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const postDoubts = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  try {
    const newDoubt = new Doubt({
      title,
      content,
      userId,
    });
    await newDoubt.save();
    res.status(201).json({
      success: true,
      message: "Doubt created successfully",
      newDoubt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const likeAndDislikeDoubt = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const post = await Doubt.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No doubt found",
      });
    }

    const isLiked = post.likes.some(
      (userId) => userId.toString() === req.user.id.toString()
    );

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      likes: post.likes.length,
      isLiked: !isLiked,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const editDoubt = async (req, res) => {
  const { id } = req.params;
  try {
    const doubt = await Doubt.findById(id);

    if (!doubt) {
      return res.status(404).json({
        success: false,
        message: "Doubt not found",
      });
    }

    if (doubt.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed",
      });
    }
    const updatedDoubt = await Doubt.findByIdAndUpdate(
      id,
      { $set: req.body },
      { returnDocument: "after" },
    );
    res.status(200).json({
      success: true,
      message: "Doubt updated successfully",
      updatedDoubt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteDoubt = async (req, res) => {
  const { id: doubtId } = req.params;
  try {
    const doubt = await Doubt.findByIdAndDelete(doubtId);

    if (!doubt) {
      return res.status(404).json({
        success: false,
        message: "Can't find doubt",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doubt deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
