import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  eventName: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: { type: String, trim: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  designation: { type: String, trim: true },
  notes: { type: String, trim: true }, // manual or AI-suggested
  tags: [String], // e.g., ['hot-lead', 'distributor']
  scannedVia: {
    type: String,
    enum: ['manual', 'aiSnap', 'badgeScan'],
    default: 'manual'
  },
  followUpStatus: {
    type: String,
    enum: ['pending', 'sent', 'ignored'],
    default: 'pending'
  },
  followUpDueDate: Date,
  followUpSentAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;