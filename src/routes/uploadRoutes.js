const express = require('express');
const multer = require('multer');
const { uploadImages } = require('../controllers/uploadController');

const router = express.Router();

// Configure multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Route for multiple images upload (e.g., up to 50 screenshots)
router.post('/', upload.array('images', 50), uploadImages);

module.exports = router;
