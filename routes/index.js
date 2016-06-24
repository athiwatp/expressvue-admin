var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:"./public/images/"})
var any = upload.single("img");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/upload', upload.single("img"), (req, res, nest) => {
  console.log(req);
  res.json(req.file);
} );
router.post('/uploadtest', (req, res, nest) => {
  any(req, res, (err) => {
    if(!err){
      res.json({body:req.body, file:req.file});
    }else{
      res.json(err);
    }
  });
} );

module.exports = router;
