import { getNotes as allNotes, newNote as createNote, deleteNote as Delete } from "../models/noteModel.js";

export const getNotes = async (req, res) => {
  try{
    const id_user = req.session.user?.id;
    const notes = await allNotes(id_user);
    res.json(notes);
  } catch (err) {
    res.status(500).json({error: err.message })
  }
}

export const newNote = async (req, res) => {
  try {
    const id_user = req.session.user?.id;
    const { title, content} = req.body;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const result = await createNote(id_user, title, content, date);
    res.json({
      id_note: result.insertId,
      title,
      content,
      date
    })
  } catch (err) {
    res.status(500).json({error: err.message })
  }
}

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "id_note is required" });
    }

    await Delete(id);
    res.status(200).json({ message: "Нотатка успішно видалена" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}