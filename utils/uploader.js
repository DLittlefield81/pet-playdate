const router = require('express').Router();
const fileUpload = require('express-fileupload');

// default option
router.use(fileUpload());//set file upload options in here



router.post('/upload', function (req, res) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    console.log('req.files >>>', req.files);

    sampleFile = req.files.sampleFile;

    uploadPath = __dirname + '/assets/uploads/' + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded to ' + uploadPath);
    });
});

