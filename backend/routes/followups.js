import express from 'express';
import FollowUp from '../models/FollowUp.js';
import Contact from '../models/Contact.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// ➕ Create a new follow-up entry
router.post('/:id/followup', authMiddleware, async (req, res) => {
  try {
    const { message, type } = req.body || {};
    const contactId = req.params.id;
    if (!contactId || !message || !type) {
      return res.status(400).json({ error: 'Missing required follow-up fields' });
    }

    const followUp = new FollowUp({
      userId: req.user.id,
      contactId,
      message,
      type, // e.g., "intro", "email", "reminder"
      createdAt: new Date(),
    });

    await followUp.save();
    res.status(201).json(followUp);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create follow-up' });
  }
});

// 📥 Get all follow-ups for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const followups = await FollowUp.find({ userId: req.user.id }).populate('contactId');
    res.status(200).json(followups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch follow-ups' });
  }
});

// ✏️ Update a follow-up entry
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const followup = await FollowUp.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.status(200).json(followup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update follow-up' });
  }
});

// ❌ Delete a follow-up
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await FollowUp.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.status(200).json({ message: 'Follow-up deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete follow-up' });
  }
});

export default router;