import Community from "../models/community.js";
import Message from "../models/message.js";
import generateCommunityCode from "../utils/generateCommunityCode.js";
export const createCommunity = async (req, res) => {
  const { name} = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name or description can't be empty",
      });
    }
    let uniqueCode;
    do {
      uniqueCode = generateCommunityCode();
    } while (await Community.exists({ uniqueCode }));
    const newCommunity = new Community({
      name,
      uniqueCode,
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

export const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find({creatorId: req.user.id});
    if(!communities) {
      return res.status(404).json({
        success: false,
        message: "No communities found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Communities fetched successfully",
      communities,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const joinCommunity = async (req, res) => {
  const { uniqueCode } = req.body;

  try {
    const findCommunity = await Community.findOne({ uniqueCode });
    if (!findCommunity) {
      return res.status(404).json({
        success: false,
        message: "Can't find community",
      });
    }
    const alreadyJoined = findCommunity.members.some(
      (member) => member.toString() === req.user.id,
    );

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: "You already joined this community",
      });
    }
    findCommunity.members.push(req.user.id);
    await findCommunity.save();
    res.status(200).json({
      success: true,
      message: "You joined successfully",
      findCommunity,
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
      message: "You left this community successfully",
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
    await Message.deleteMany({ community: id });
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
