import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  phone: { type: String, trim: true }, course: { type: String, trim: true },
  schedule: {
    days: { type: [{ type: String, enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] }], default: [] },
    time: { type: String, default: '' },
    durationMinutes: { type: Number, min: 5, max: 480, default: 30 },
    sessionType: { type: String, enum: ['ONE_TO_ONE', 'GROUP'], default: 'ONE_TO_ONE' }
  },
  role: { type: String, enum: ['ADMIN', 'STUDENT'], default: 'STUDENT', index: true },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
}, { timestamps: true });
userSchema.methods.comparePassword = function (password) { return bcrypt.compare(password, this.passwordHash); };
export default mongoose.model('User', userSchema);
