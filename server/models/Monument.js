import mongoose from 'mongoose';

const monumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  ticketPrice: {
    type: Number,
    required: true
  },
  openingHours: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Monument', monumentSchema);