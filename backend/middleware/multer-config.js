const multer = require('multer');


// Define Mime_types Logic
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

// exports multer & add limits size accepted
module.exports = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 512,
    fieldNameSize: 200
  }
}).single('image');