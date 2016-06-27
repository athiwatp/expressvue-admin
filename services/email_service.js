var _ = require("lodash");
var nodemailer = require("nodemailer");
var jsonfile = require("jsonfile")
var file = "./config/site_config.json"

module.exports = {
  sendMail(mail, cb){
    jsonfile.readFile(file, (err, obj) => {
      mail = _.assign(mail, obj.mailData)
      var transporter = nodemailer.createTransport(obj.smtp);
      transporter.sendMail(mail, (err, info) => {
        console.log(err, info);
        cb({error:err, info:info, mail:mail, smtp:obj.smtp});
      });
    });
  },
  verify(cb){
    jsonfile.readFile(file, (err, obj) => {
      var mail = _.assign(mail, obj.mailData)
      var transporter = nodemailer.createTransport(obj.smtp);
      transporter.verify((err, success) => {
        console.log(err, success);
        cb({error:err, success:success, smtp:obj.smtp});
      });

    })
  }
}
