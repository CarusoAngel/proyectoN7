import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

export const uploadPhoto = (folderName, fieldName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `public/uploads/${folderName}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuidv4()}${ext}`);
    }
  });

  // Mejor omitimos fileFilter si no necesitamos validación extra.
  return multer({ storage }).single(fieldName);
};