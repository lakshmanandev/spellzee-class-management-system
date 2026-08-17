import mongoose from 'mongoose';
const classSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  course: { type: String, required: true, trim: true }, teacher: { type: String, required: true, trim: true },
  date: { type: Date, required: true, index: true }, time: { type: String, required: true },
  status: { type: String, enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'], default: 'SCHEDULED', index: true },
  attendance: { type: String, enum: ['NOT_MARKED', 'PRESENT', 'ABSENT'], default: 'NOT_MARKED' }
}, { timestamps: true });
classSchema.index({ studentId: 1, date: 1 });
export default mongoose.model('Class', classSchema);
