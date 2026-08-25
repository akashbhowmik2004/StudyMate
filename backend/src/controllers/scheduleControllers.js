import Schedule from "../models/schedule.js";

export const findSession = async (req, res) => {
  const { date } = req.query;
  const userId = req.user.id;
  try {
    if (!date) {
      return res
        .status(400)
        .json({ success: false, message: "Date query parameter is required" });
    }
    const sessions = await Schedule.find({ userId, date }).sort({
      startTime: 1,
    });
    res.status(200).json({ success: true, sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createSession = async (req, res) => {
  const userId = req.user.id;
  const { title, subject, date, startTime, endTime, type } = req.body;
  try {
    if (!title || !subject || !date || !startTime || !endTime || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newSession = new Schedule({
      userId,
      title,
      subject,
      date,
      startTime,
      endTime,
      type,
    });
    await newSession.save();
    res.status(201).json({
      success: true,
      message: "Session created successfully",
      session: newSession,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const setSessionCompletion = async (req, res) => {
  const userId = req.user.id;
  const { sessionId } = req.params;
  try {
    const session = await Schedule.findOne({ _id: sessionId, userId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    if(session.completed) {
      return res.status(400).json({ message: "Session is already marked as completed" });
    }
    session.completed = true;
    await session.save();
    res
      .status(200)
      .json({ success: true, message: "Session completion updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSession = async (req, res) => {
  const userId = req.user.id;
  const { sessionId } = req.params;
  try {
    const deletedSession = await Schedule.findOneAndDelete({
      _id: sessionId,
      userId,
    });
    if (!deletedSession) {
      return res.status(404).json({ message: "Session not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Session deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
