import express from 'express';
import Contact from '../models/Contact.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// ➕ Add a new contact
router.post('/', authMiddleware, async (req, res) => {
  try {
    const contact = new Contact({ ...req.body, createdBy: req.user.id });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// 📥 Get all contacts for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ createdBy: req.user.id });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// ✏️ Update a contact
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// ❌ Delete a contact
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Contact.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

export default router;