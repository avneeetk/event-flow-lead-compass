import mongoose from 'mongoose';

const followUpSchema = new mongoose.Schema({
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['email', 'introduction', 'reminder'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  introWith: {
    type: String // only used if type = 'introduction'
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'scheduled'],
    default: 'draft'
  },
  sentAt: Date,
  scheduledFor: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FollowUp = mongoose.model('FollowUp', followUpSchema);
export default FollowUp;