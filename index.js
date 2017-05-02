var express = require('express');
var multer = require('multer')
var cors = require('cors')

var mime = require('mime')
// var fs = require('fs')
// var path = require('path')
// var Loki = require('lokijs')

// setup
// const DB_NAME = 'db.json';
// const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const storage = multer.diskStorage({
  destination: `${UPLOAD_PATH}/`,
  filename: (req, file, next) => next(null, `${Date.now()}.${mime.extension(file.mimetype)}`)
  // filename: (req, file, next) => next(null, file.originalname)
}); // multer configuration

const upload = multer({ storage }); // multer configuration
                                                    // 
                                                    // 
// const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

// app
const app = express();
app.use(cors());

app.listen(3000, function () {
    console.log('listening on port 3000!');
});

app.get("/", (req, res) => {
	console.log("foi!");
	res.end("Foi!");
})

app.post("/up", upload.single('avatar'), (req, res) => {
	console.log(req.file);
  res.end(req.file)
})

app.post("/up-array", upload.array('avatar-array'), (req, res) => {
  console.log(req.file, req.files);
  res.end("[" +req.files.map(f => f.filename).join(",") + "]");
})

