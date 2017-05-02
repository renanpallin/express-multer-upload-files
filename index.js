var express = require('express');
var multer = require('multer')
var cors = require('cors')

var bodyParser = require('body-parser');

const app = express();
app.use(cors());


app.use(bodyParser.json({ 
  type: "application/json",
  // reviver: (key, value) => {
  //   console.log('PARSER >', key, value);
  //   return value;
  // }
}));

/**
 * Ideia FODA: 
 * Uma validação para json em middleware, olha que maravilha!!!!!
 * Neste exemplo, só aceitamos JSON que contém um campo name e
 * um campo skills do tipo array.
 * @param  {[type]}
 * @return {[type]}
 */
app.use((req, res, next) => {
  console.log("--- Meu middleware ---")

  console.log("const", req.body.skills && req.body.skills.constructor)

  // if (req.body.skills) {
  //   console.log("if do skills")
  //   if (req.body.skills.constructor == Array){
  //     console.log("if do skills constructor")
  //   }
  // }

  // if (req.body.skills && req.body.skills.constructor == Array) {
  //   console.log('no ifzão');
  // }


  if(!req.body.name)
    res.json({error: "Faltando field name"});
  else if(!req.body.skills || req.body.skills.constructor !== Array)
    res.json({error: "Faltando field skills ou ele não é do tipo array"});
  else 
    next();
  console.log("--- Meu middleware ---")
})
// app.use(bodyParser.json());

var mime = require('mime')


const UPLOAD_PATH = 'uploads';
const storage = multer.diskStorage({
  destination: `${UPLOAD_PATH}/`,
  filename: (req, file, next) => next(null, `${Date.now()}.${mime.extension(file.mimetype)}`)
  // filename: (req, file, next) => next(null, file.originalname)
}); // multer configuration

const upload = multer({ storage }); // multer configuration


app.listen(3000, function () {
    console.log('listening on port 3000!');
});

// app.get("/", (req, res) => {
// 	console.log(req.body);
// 	res.end({sucess: true});
// })

/*
Api JSON
 */
app.post("/api", (req, res) => {
  console.log(req.body);
  res.json(req.body);
})

/*
Api arquivos
 */
app.post("/up", upload.single('avatar'), (req, res) => {
	console.log(req.file);
  res.json(req.file)
})

app.post("/up-array", upload.array('avatar-array'), (req, res) => {
  console.log(req.file, req.files);
  res.end("[" +req.files.map(f => f.filename).join(",") + "]");
})

