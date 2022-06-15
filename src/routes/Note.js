const express = require("express");
const router = express.Router();
const {
  getNoteById,
  updateNoteById,
} = require("../controllers/notesController");

const Note = require("./../models/Note");

router.get("/list", async function (req, res) {
  const notes = await Note.find();
  if (notes === null) {
    return res.json({ message: "No notes found" });
  }
  res.status(200).json(notes);
});

router.get("/:id", getNoteById);
router.put("/:id", updateNoteById);

router.post("/add", async function (req, res) {
  var newNote = new Note({
    userid: req.body.userid,
    title: req.body.title,
    content: req.body.content,
  });
  await newNote.save();

  const response = { message: "created" };
  res.status(200).json(response);
});

router.post("/delete", async function (req, res) {
  await Note.deleteOne({ id: req.body.id });

  const response = {
    message: "new note deleted: " + `id: ${req.body.id}`,
  };
  res.json(response);
});

module.exports = router;
