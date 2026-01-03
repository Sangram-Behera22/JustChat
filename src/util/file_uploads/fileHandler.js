const multer = require('multer');
const path = require('path');
const fs = require('fs');

function createUploader(folder) {
    const storage = multer.diskStorage({
        destination: function (_req, _file, cb) {
            const uploadPath = path.join(__dirname, '../../../public/uploads', folder);
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: function (_req, file, cb) {
            cb(null, folder + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    return multer({
        storage: storage,
        limits: { fileSize: 1000000 } // 1 MB
    });
}

const uploadFile = (folder, fieldName) => {
    const uploader = createUploader(folder);
    return uploader.single(fieldName);
};

module.exports = { uploadFile };
