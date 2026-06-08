import Community from "../models/community.js";

export const createCommunity = async (req, res) => {
  const { name, description } = req.body;

  try {
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name or description can't be empty",
      });
    }
    const newCommunity = new Community({
      name,
      description,
      creatorId: req.user.id,
      members: [req.user.id],
    });
    await newCommunity.save();
    res.status(201).json({
      success: true,
      message: "Community created successfully",
      newCommunity,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Community of same name is already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const findCommunity = async (req, res) => {
  const { id } = req.params;

  try {
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Can't find community",
      });
    }
    res.status(200).json({
      success: true,
      message: "Community found",
      community,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const joinCommunity = async (req, res) => {
  const { id } = req.params;

  try {
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Can't find community",
      });
    }
    const alreadyJoined = community.members.some(
      (member) => member.toString() === req.user.id,
    );

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: "You already joined this community",
      });
    }
    await community.updateOne({
      $push: { members: req.user.id },
    });
    res.status(200).json({
      success: true,
      message: "You joined successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const leaveCommunity = async (req, res) => {
  const { id } = req.params;

  try {
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Can't find community",
      });
    }
    const isMember = community.members.some(
      (member) => member.toString() === req.user.id,
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this community",
      });
    }
    await community.updateOne({
      $pull: { members: req.user.id },
    });
    res.status(200).json({
      success: true,
      message: "You leave this community successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteCommunity = async (req, res) => {
  const { id } = req.params;

  try {
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Can't find community",
      });
    }
    await Community.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Community deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
