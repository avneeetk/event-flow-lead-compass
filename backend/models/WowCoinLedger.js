import mongoose from 'mongoose';

const coinLedgerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activity: {
    type: String,
    enum: ['AI_Snap', 'FollowUp_Draft', 'Intro_Suggestion', 'Auto_Email', 'Bonus', 'Recharge'],
    required: true
  },
  coinsChanged: {
    type: Number,
    required: true
  },
  balanceAfter: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const WowCoinLedger = mongoose.model('WowCoinLedger', coinLedgerSchema);
export default WowCoinLedger;