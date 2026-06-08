import comment from "../models/comment.js";
import community from "../models/community.js";
import doubt from "../models/doubt.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { password: userPassword, ...otherDetails } = user._doc;

    res.status(200).json({
      success: true,
      message: "User found",
      otherDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const updateProfile = async (req, res) => {
  const { newPassword, confirmNewPassword, username, email } = req.body;

  try {
    const updates = {};

    if (username) updates.username = username;
    if (email) updates.email = email;

    if (newPassword && confirmNewPassword) {
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          success: false,
          message: "Passwords didn't match",
        });
      }

      const salt = bcrypt.genSaltSync(10);
      updates.password = bcrypt.hashSync(newPassword, salt);
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
    //Delete all the doubts created by the user
    await doubt.deleteMany({ userId: req.user.id });

    //Delete all the communitites deleted by the user
    await community.deleteMany({ creatorId: req.user.id });

    //Delete All the coments of user
    await comment.deleteMany({ userId: req.user.id });

    //Remove the user from all the communities he join
    await community.updateMany(
      { members: req.user.id },
      { $pull: { members: req.user.id } },
    );

    //Lastly clear all the cokkies
    res.clearCookie("jwt");

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
