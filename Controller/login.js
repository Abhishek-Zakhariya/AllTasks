const conn = require("../config/connection");
const md5 = require("blueimp-md5");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {

  let email = req.body.email;
  let pass = req.body.pass;
  let matched = false;

  let pro = new Promise((resolve, reject) => {
    let sql = `select * from users where email = '${email}'`;
    conn.query(sql, function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });

  pro.then((result) => {
    let encPass = md5(pass + result[0].salt);
    if (result[0].pass == encPass && result[0].activeUser == 1) {
      matched = true;
      let token = jwt.sign({ email: email }, process.env.secKey);
      res.cookie('token', token, { maxAge: 1000 * 60 * 60, httpOnly: true }).json({ code: 200 });
    }
    else {
      matched = false;
      res.json({ code: 300 });
    }
  });
}

module.exports = login;