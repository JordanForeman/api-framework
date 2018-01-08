import multer from 'multer';

export default (filename) => multer().single(filename);