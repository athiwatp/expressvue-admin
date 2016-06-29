var express = require('express');
var router = express.Router();
var email_service = require("../services/email_service");

router.post("/sendMail", (req,res,nest) => {
  if(req.body.to){
    // var mailData = {
    //     from: 'sender@server.com',
    //     to: 'receiver@sender.com',
    //     subject: 'Message title',
    //     text: 'Plaintext version of the message',
    //     html: 'HTML version of the message'
    // };
    email_service.sendMail(req.body, (data) => {
      res.json(data);
    })
  }else{
    res.status(400).json({status:false,message:"'To' field is required to send mail"})
  }

})

router.post("/verifyemailconfig", (req,res,nest) => {
  email_service.verify((data) => {
    res.json(data);
  })
})
module.exports = router;
