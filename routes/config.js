var express = require('express');
var _ = require("lodash");
var router = express.Router();
var jsonfile = require("jsonfile")
var file = "./config/site_config.json"

router.get("/", function (req,res,next) {
  jsonfile.readFile(file, (err, obj) => {
    res.json(obj);
  })

})
router.put("/", function (req,res,next) {
  jsonfile.readFile(file, (err, obj) => {
    obj = obj || {};
    var new_data = _.assign(obj, req.body);
    console.log(new_data);
    jsonfile.writeFile(file, new_data, {spaces:2}, (err) => {
      if(err){
        console.log(err)
        res.status(500).json(err);
      }
      else{
        res.json({status:true, message:"Configuration successfuly saved"})
      }
    });
  })

})
module.exports = router
