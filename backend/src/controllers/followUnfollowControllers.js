import FollowRequest from "../models/followRequestSchema.js";
import User from "../models/user.js";

export const getFollowRequests = async (req, res) => {
  const userId = req.user.id;
  try {
    const followRequests = await FollowRequest.find({
      receiver: userId,
      status: "pending",
    }).populate("sender", "name username email");
    res.status(200).json({
      success: true,
      requests: followRequests,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const sendFollowRequest = async (req, res) => {
  const { receiverId } = req.params;
  const senderId = req.user.id;
  try {
    // User cannot send a follow request to themselves
    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a follow request to yourself",
      });
    }
    const receiver = await User.findById(receiverId);
    //Check if user exists
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver user not found",
      });
    }
    const user = await User.findById(senderId);
    // Check if the sender is already following the receiver
    const isFollowing = user.followings.includes(receiverId);
    if (isFollowing) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }
    // Check if a follow request already exists
    const existingRequest = await FollowRequest.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Follow request already sent",
      });
    }
    const followRequest = new FollowRequest({
      sender: senderId,
      receiver: receiverId,
    });
    await followRequest.save();
    res.status(201).json({
      success: true,
      message: "Follow request sent successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const sendFollowRequestByUniqueId = async (req, res) => {
  const senderId = req.user.id;
  const { uniqueId } = req.body;
  try {
    const receiver = await User.findOne({ uniqueId });
    //console.log("Receiver found:", receiver._id.toString());
    //console.log("Sender ID:", senderId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
    // User cannot send a follow request to themselves
    if (senderId === receiver._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a follow request to yourself",
      });
    }
    //Check if user exists
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver user not found",
      });
    }
    const user = await User.findById(senderId);
    // Check if the sender is already following the receiver
    const isFollowing = user.followings.includes(receiver._id);
    if (isFollowing) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }
    // Check if a follow request already exists
    const existingRequest = await FollowRequest.findOne({
      sender: senderId,
      receiver: receiver._id,
      status: "pending",
    });
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Follow request already sent",
      });
    }
    const followRequest = new FollowRequest({
      sender: senderId,
      receiver: receiver._id,
    });
    await followRequest.save();
    res.status(201).json({
      success: true,
      message: "Follow request sent successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const acceptFollowRequest = async (req, res) => {
  const { senderId } = req.params;
  const { requestId } = req.body;
  const receiverId = req.user.id;
  try {
    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot accept a follow request from yourself",
      });
    }
    const request = await FollowRequest.findOne({
      _id: requestId,
      sender: senderId,
      status: "pending",
    });
    if (!request) {
      return res.status(404).json({
        success: false,
        message:
          "Follow request not found or you are not authorized to accept this request",
      });
    }
    const senderUser = await User.findById(senderId);
    console.log("User to follow:", senderUser);
    const currentUser = await User.findById(receiverId);
    console.log("Current user:", currentUser);
    const isFollowing = currentUser.followers.includes(senderId);
    if (isFollowing) {
      return res.status(400).json({
        success: false,
        message: "You are already friends with this user",
      });
    }
    senderUser.followings.push(receiverId);
    currentUser.followers.push(senderId);
    await senderUser.save();
    await currentUser.save();
    await FollowRequest.findOneAndUpdate(
      { _id: requestId },
      { status: "accepted" },
    );
    return res.status(200).json({
      success: true,
      message: "Follow request accepted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const rejectFollowRequest = async (req, res) => {
  const { senderId } = req.params;
  const { requestId } = req.body;
  const receiverId = req.user.id;
  try {
    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot accept or reject a follow request from yourself",
      });
    }
    const request = await FollowRequest.findOne({
      _id: requestId,
      sender: senderId,
      status: "pending",
    });
    if (!request) {
      return res.status(404).json({
        success: false,
        message:
          "Follow request not found or you are not authorized to accept this request",
      });
    }
    const senderUser = await User.findById(senderId);
    console.log("User to follow:", senderUser);
    const currentUser = await User.findById(receiverId);
    console.log("Current user:", currentUser);
    await FollowRequest.findOneAndUpdate(
      { _id: requestId },
      { status: "declined" },
    );
    return res.status(200).json({
      success: true,
      message: "Follow request rejected successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const unfollowUser = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;
  try {
    if (userId === currentUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow/unfollow yourself",
      });
    }
    const userToUnfollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);
    if (!userToUnfollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isUnfollowing = userToUnfollow.followers.includes(currentUserId);
    if (!isUnfollowing) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user",
      });
    } else {
      userToUnfollow.followers.pull(currentUserId);
      currentUser.followings.pull(userId);
      await userToUnfollow.save();
      await currentUser.save();
      return res.status(200).json({
        success: true,
        message: "User unfollowed successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
