import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const deleteFileFromS3 = async (fileUrl) => {
  try {
    const fileKey = fileUrl.split('.com/')[1]; // S3 경로에서 key 추출
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileKey,
    });
    await s3.send(command);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
  }
};

export const uploadImage = (fieldName, multiple) => {
  const upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET,
      key: (req, file, cb) => {
        cb(null, `profiles/${Date.now()}_${file.originalname}`);
      },
      metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname });
      },
    }),
  });

  return multiple ? upload.array(fieldName, 3) : upload.single(fieldName);
};
