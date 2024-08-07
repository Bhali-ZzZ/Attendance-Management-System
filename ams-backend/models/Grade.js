import mongoose from 'mongoose';

const GradeSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true
  },
  minAttendancePercentage: {
    type: Number,
    required: true
  },
  maxAttendancePercentage: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Grade', GradeSchema);
