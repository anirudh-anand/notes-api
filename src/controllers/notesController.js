const Note = require("./../models/Note");

const getNoteById = async (req, res, id) => {
  const note = await Note.find({ id });
  if (note === null) {
    return res.json({ message: `No notes found with id : ${id}`, status: false });
  }
  return res.status(200).json(note);
};

const updateNoteById = async (req, res, id) => {
  const note = await Note.findOneAndUpdate(
    { id },
    {
      userid: req.body.userid,
      title: req.body.title,
      content: req.body.content,
    }
  );
  if (note === null) {
    return res.json({ message: `No notes found with id : ${id}`,status: false });
  }
  return res.status(200).json({message: 'Note updated', status: true});
};

module.exports = { getNoteById, updateNoteById };
