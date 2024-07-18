const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.get('/', async (req, res) => {
  try {
    const notes = await Note.getAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error });
  }
});

router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const note = new Note(title, content, userId);
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const note = await Note.getById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note', error });
  }
});

router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    await Note.update(req.params.id, title, content);
    res.json({ message: 'Note updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Note.delete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error });
  }
});

module.exports = router;
