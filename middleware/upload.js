const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = ("/uploads");

        const fileDir = file.fieldname === "image" ? "/images" : file.fieldname === "book" ? "/books" : file.fieldname === "audio" ? "/audioa" : null;
        
        if (!fileDir) {
             cb(new Error("invalid fieldname"));
        } 
        const dest = uploadsDir + fileDir;

        fs.mkdirSync(uploadsDir, { recursive: true });
        fs.mkdirSync(dest, { recursive: true });
        cb(null, dest);

    },
    filename: (req, file, cb) => {
        const filename = file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null, filename)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedMimes = {
            'image': ['image/jpeg', 'image/png', 'image/gif'],
            'audio': ['audio/mpeg', 'audio/x-mpeg', 'audio/wav', 'audio/ogg', 'audio/aac'],
            'book': ['application/pdf', 'application/msword', 'text/plain']
        };
        const fieldName = file.fieldname;
        if (allowedMimes[fieldName] && allowedMimes[fieldName].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('give appropriate file type'))
        }
    }
}).fields([{name: 'image'}, {name: 'audio'}, {name: 'book'}]);

module.exports = upload;
