import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// 🧠 AI Follow-Up Draft Generator
router.post('/followup', authMiddleware, async (req, res) => {
  const { contactName, context } = req.body;

  // Mock AI response
  const message = `
    Hi ${contactName},
    
    It was great meeting you at the event. As discussed, here's a quick summary of what we talked about:
    
    ${context}
    
    Let me know how you'd like to move forward.
    
    Regards,
    Sarah
  `;

  // Normally, you'd call Gemini API here.

  res.status(200).json({
    message,
    type: 'followup',
    coinsUsed: 1
  });
});

// ✨ AI Intro Message Generator
router.post('/intro', authMiddleware, async (req, res) => {
  const { leadName, toName, mutualContext } = req.body;

  const message = `
    Hi ${toName},
    
    Just looping in ${leadName} whom I met recently at the event. They’re doing some exciting work and I thought this would be a great fit based on ${mutualContext}.
    
    Feel free to take it forward.
    
    Best,
    Sarah
  `;

  res.status(200).json({
    message,
    type: 'intro',
    coinsUsed: 1
  });
});

// 📇 AI Card Scan Summary (mock)
router.post('/scan-summary', authMiddleware, async (req, res) => {
  const { cardText } = req.body;

  const summary = {
    name: "Dr. Anjali Mehta",
    company: "NovoMed Pharma",
    designation: "Regional Head",
    email: "anjali@novomed.com",
    notes: "Interested in diabetic product trials",
  };

  // Mocking parsed data
  res.status(200).json({
    summary,
    coinsUsed: 1
  });
});

export default router;