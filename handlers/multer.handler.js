const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/mp4|png|gif|jpg|jpeg|jfif|$i/)) {
      cb(new Error("file is not supported"), false);
    }

    cb(null, true);
    return;
  },
});
