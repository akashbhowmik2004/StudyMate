import Subject from "../models/subject.js";
import Note from "../models/notes.js";

export const getSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }
    res.status(200).json({
      success: true,
      subject,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user.id });
    if (!subjects) {
      return res.status(404).json({
        success: false,
        message: "No subjects found",
      });
    }
    const noteCount = await Note.countDocuments({
      userId: req.user.id,
    });
    const subjectsWithCount = await Promise.all(
      subjects.map(async (subject) => {
        const count = await Note.countDocuments({
          subjectId: subject._id,
          userId: req.user.id,
        });

        return {
          ...subject.toObject(),
          count,
        };
      }),
    );

    res.status(200).json({
      success: true,
      subjects: subjectsWithCount,
      totalNotes: noteCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const createSubject = async (req, res) => {
  const { name } = req.body;
  try {
    const newSubject = new Subject({
      name,
      userId: req.user.id,
    });
    await newSubject.save();
    res.status(201).json({
      success: true,
      subject: newSubject,
      message: "Subject created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }
    await Note.deleteMany({ subjectId: subject._id, userId: req.user.id });
    await Subject.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
