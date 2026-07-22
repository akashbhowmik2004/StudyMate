import { Router } from "express";
import { createNotes, deleteNote, editNote, getNotes, getAllNotes, getNotesBySubject } from "../controllers/noteControllers.js";
import { validateCreateNote, validateEditNote } from "../middleware/validateNotesInput.js";

const router = Router();

router.post("/",validateCreateNote, createNotes);
router.get("/", getAllNotes);
router.get("/:id", getNotes);
router.get("/", getNotesBySubject);
router.put("/:id",validateEditNote, editNote);
router.delete("/:id", deleteNote);

export default router;