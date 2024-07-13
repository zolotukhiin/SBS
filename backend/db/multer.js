import multer from 'multer';

// хранение файлов
const uploadDestination = 'uploads';
const storage = multer.diskStorage({
    destination: uploadDestination,
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

export const uploads = multer({ storage: storage});