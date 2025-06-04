// Multer is a Node.js middleware used with Express.js to handle file uploads. 
// It processes multipart/form-data, which is required for uploading files via 
// HTML forms. Multer helps store uploaded files in a specific directory or buffer 
// them in memory for further processing.

import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload =multer({storage}).single("file");