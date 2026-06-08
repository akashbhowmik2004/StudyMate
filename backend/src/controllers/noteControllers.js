import notes from "../models/notes.js";

export const getNotes = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await notes.findById(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Can't find note",
      });
    }
    res.status(200).json({
      success: true,
      note,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const createNotes = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = new notes({
      title,
      content,
      userId: req.user.id,
    });
    await newNote.save();
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      newNote,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const editNote = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNote = await notes.findByIdAndUpdate(
      id,
      { $set: req.body },
      { returnDocument: "after" },
    );
    if (!updatedNote) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteNote = async (req, res) => {
  const { id: doubtId } = req.params;
  try {
    const note = await notes.findByIdAndDelete(doubtId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Can't find note",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};