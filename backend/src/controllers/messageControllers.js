import User from "../models/user.js";
import Message from "../models/message.js";

export const createMessage = async (req, res) => {
  const { communityId, text } = req.body;
  try{
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const message = new Message({
      community: communityId,
      sender: req.user.id,
      text,
      username: user.username,
    });
    await message.save();
    res.status(201).json(message);
  } catch(error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Failed to create message" });
  }
}

export const getMessagesByCommunity = async (req, res) => {
  const { communityId } = req.params;
  console.log("Fetching messages for community:", communityId);
  try {
    const messages = await Message.find({ community: communityId });
    const type = req.user.id === messages.sender ? "me" : "regular";
    if (!messages) {
      return res.status(404).json({
        error: "No messages found for this community",
      });
    }

    res.status(200).json({
      status: "success",
      messages,
      type,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      error: "Failed to fetch messages",
    });
  }
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    const message = await Message.findByIdAndDelete(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json({ status: "success", message: "Message deleted" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
};