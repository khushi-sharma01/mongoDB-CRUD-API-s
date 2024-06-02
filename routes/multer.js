const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, uuidv4() + ext);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
