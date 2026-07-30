const { uploadToCloudflare } = require('../utils/cloudflareService');

// @desc    Upload multiple files to Cloudflare
// @route   POST /api/upload
// @access  Public (or Private in production)
const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      res.status(400);
      throw new Error('Please upload at least one image file');
    }

    const uploadPromises = req.files.map((file) =>
      uploadToCloudflare(file.buffer, file.originalname, file.mimetype)
    );

    const urls = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      urls,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImages,
};
