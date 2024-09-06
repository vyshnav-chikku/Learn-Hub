const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// POST route for creating a course
router.post('/', auth, upload.single('logo'), async (req, res) => {
  const { title, description, fee } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      fee,
      logo: req.file ? `/uploads/${req.file.filename}` : null,
      mentor: req.user.id, // Assuming req.user is set from the auth middleware
    });

    await newCourse.save();
    res.json({ message: 'Course created successfully', course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route for fetching all courses created by the mentor
router.get('/', auth, async (req, res) => {
    console.log("hi mentor course");
    
  try {

    
    const courses = await Course.find({ mentor: req.user.id });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/:id', auth, async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate('sections');
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
