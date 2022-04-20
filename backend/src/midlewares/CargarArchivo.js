const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../storage/docs"),
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        //console.log('file desde cargar',file)
        // const fileTypes = /jpeg|jpg|png|svg|SVG|PNG|JPG|JPEG|pdf|PDF/;
        const fileTypes = /pdf|PDF/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb('error, la extension del archivo debe ser pdf')
    },
});

module.exports = upload;