const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Initialize the S3 client configured for Cloudflare R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a file buffer to Cloudflare R2 bucket
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {string} fileName - Original filename
 * @param {string} mimeType - File mime type
 * @returns {Promise<string>} - The uploaded image URL (R2 public domain URL)
 */
const uploadToCloudflare = async (fileBuffer, fileName, mimeType = 'image/jpeg') => {
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'axrweb';
  const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;

  if (!publicUrl) {
    throw new Error('CLOUDFLARE_R2_PUBLIC_URL is not configured in .env');
  }

  // Create a unique key for the file
  const fileKey = `listings/${Date.now()}-${fileName.replace(/\s+/g, '_')}`;

  const uploadParams = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // Return the public URL to access the image
    // Ensure publicUrl does not end with a trailing slash
    const formattedPublicUrl = publicUrl.endsWith('/') ? publicUrl.slice(0, -1) : publicUrl;
    return `${formattedPublicUrl}/${fileKey}`;
  } catch (error) {
    throw new Error(`R2 Upload failed: ${error.message}`);
  }
};

module.exports = {
  uploadToCloudflare,
};
