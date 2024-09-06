const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: String,
  videoUrl: String, // URL for the video
  assignment: String, // Could be a URL or text describing the assignment
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fee: { type: Number, required: true },
  logo: String, // URL for the uploaded image
  sections: [sectionSchema], // Array of sections
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // The mentor who created the course
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
