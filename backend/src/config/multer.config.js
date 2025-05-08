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

  const fileFilter = (req, file, cb) => {
    if (!file) {
      cb(null, false); // No lanza error si no hay archivo
    } else {
      cb(null, true); // Acepta el archivo si viene
    }
  };

  return multer({ storage, fileFilter }).single(fieldName);
};