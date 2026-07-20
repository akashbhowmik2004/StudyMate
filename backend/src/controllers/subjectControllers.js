import Subject from "../models/subject.js";

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

export const createSubject = async(req,res) => {
    const { name } = req.body;
    try{
        const newSubject = new Subject({
            name,
            userId: req.user.id
        });
        await newSubject.save();
        res.status(201).json({
            success: true,
            subject: newSubject,
            message: "Subject created successfully"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}
