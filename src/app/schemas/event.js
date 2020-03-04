import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model('event', EventSchema);