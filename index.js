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
  res.end("foi")
	// res.end(JSON.stringify({sucess: true}));
	// var loadCollection = require('./utils').loadCollection;
 //  try {
 //    const col = loadCollection(COLLECTION_NAME, db);
 //    col.then(collection => {
 //      // console.log(collection);
 //      const data = collection.insert(req.file);
 //    })


 //    db.saveDatabase();
 //    res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
 //  } catch (err) {
 //      console.log(err)
 //      res.sendStatus(400);
 //  }
})
