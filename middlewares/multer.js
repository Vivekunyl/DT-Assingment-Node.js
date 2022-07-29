const multer = require('multer');
const path = require('path')

// set storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {

        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
            cb(null, './uploads/');
        } else {
            const error = new Error("Only jpg/jpeg and png files are allowed!");
            cb(error, false);
        }

    },
    filename: function(req, file, cb) {

        // to modifiy name            
        const ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

        cb(null, file.originalname.split('.').slice(0, -1) + '_' + Date.now() + ext)
    }
})



store = multer({ storage: storage });


module.exports = store;