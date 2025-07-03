import express from 'express';
import WowCoinLedger from '../models/WowCoinLedger.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔍 Get coin balance for the logged-in user
router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const ledger = await WowCoinLedger.findOne({ userId: req.user.id });
    const balance = ledger ? ledger.balance : 0;
    res.status(200).json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Failed to fetch coin balance' });
  }
});

// ➖ Deduct WowCoin(s) for an AI feature
router.post('/deduct', authMiddleware, async (req, res) => {
  try {
    const { amount, reason } = req.body || {};
    if (!req.body || !amount || amount <= 0 || !reason) {
      console.error('Invalid request body, amount or reason missing:', req.body);
      return res.status(400).json({ error: 'Invalid request body, amount or reason missing' });
    }

    let ledger = await WowCoinLedger.findOne({ userId: req.user.id });

    if (!ledger) {
      console.error(`Ledger not found for user ${req.user.id}`);
      return res.status(400).json({ error: 'Ledger not found. Please initialize account.' });
    }

    if (ledger.balance < amount) {
      console.error(`Insufficient balance for user ${req.user.id}: requested ${amount}, available ${ledger.balance}`);
      return res.status(402).json({ error: 'Insufficient balance' });
    }

    ledger.balance -= amount;
    ledger.transactions.push({ amount: -amount, reason, date: new Date() });
    await ledger.save();

    console.log(`Deducted ${amount} coins from user ${req.user.id} for reason: ${reason}`);
    res.status(200).json({ message: 'Coins deducted', newBalance: ledger.balance });
  } catch (error) {
    console.error('Error deducting coins:', error);
    res.status(500).json({ error: 'Failed to deduct coins' });
  }
});

// ➕ Add coins (bonus or purchase)
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { amount, reason } = req.body || {};
    if (!req.body || !amount || amount <= 0 || !reason) {
      console.error('Invalid request body, amount or reason missing:', req.body);
      return res.status(400).json({ error: 'Invalid request body, amount or reason missing' });
    }

    let ledger = await WowCoinLedger.findOne({ userId: req.user.id });

    if (!ledger) {
      ledger = new WowCoinLedger({
        userId: req.user.id,
        balance: 0,
        transactions: [],
      });
      console.log(`Created new ledger for user ${req.user.id}`);
    }

    ledger.balance += amount;
    ledger.transactions.push({ amount, reason, date: new Date() });
    await ledger.save();

    console.log(`Added ${amount} coins to user ${req.user.id} for reason: ${reason}`);
    res.status(200).json({ message: 'Coins added', newBalance: ledger.balance });
  } catch (error) {
    console.error('Error adding coins:', error);
    res.status(500).json({ error: 'Failed to add coins' });
  }
});

export default router;