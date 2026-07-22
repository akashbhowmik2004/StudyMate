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

export const getAllNotes = async (req, res) => {
  const { subjectId, type } = req.query;
  try {
    console.log(req.query);
    const filter = { userId: req.user.id };
    if (subjectId) {
      filter.subjectId = subjectId;
    }
    if (type && type !== "all") {
      filter.type = type;
    }
    const allNotes = await notes.find(filter);
    if (!allNotes) {
      return res.status(404).json({
        success: false,
        message: "No notes found",
      });
    }
    const allCount = await notes.countDocuments({
      userId: req.user.id,
      subjectId,
    });

    const textCount = await notes.countDocuments({
      userId: req.user.id,
      subjectId,
      type: "text",
    });

    const imageCount = await notes.countDocuments({
      userId: req.user.id,
      subjectId,
      type: "image",
    });

    const pdfCount = await notes.countDocuments({
      userId: req.user.id,
      subjectId,
      type: "pdf",
    });
    res.status(200).json({
      success: true,
      notes: allNotes,
      counts: {
        all: allCount,
        text: textCount,
        image: imageCount,
        pdf: pdfCount,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getNotesBySubject = async (req, res) => {
  const { subjectId } = req.params;
  try {
    const notesBySubject = await notes.find({ subjectId, userId: req.user.id });
    if (!notesBySubject) {
      return res.status(404).json({
        success: false,
        message: "No notes found for this subject",
      });
    }
    res.status(200).json({
      success: true,
      notes: notesBySubject,
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
  const { type, title, content, subjectId } = req.body;

  try {
    const newNote = new notes({
      type,
      title,
      content,
      subjectId,
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
