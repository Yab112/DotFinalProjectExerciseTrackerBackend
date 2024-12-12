import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dqho0rsp3",
  api_key: "912776471756749",
  api_secret: "eD3A9LAZxuljOhxtQSQK28h_jT0",
});

// Configure Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folder = file.fieldname === 'file' ? 'books' : 'book_covers';
    const resource_type = file.fieldname === 'file' ? 'raw' : 'image';
    return {
      folder: folder,
      resource_type: resource_type,
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const upload = multer({ storage });

export default upload;
