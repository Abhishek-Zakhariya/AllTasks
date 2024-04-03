const md5 = require("blueimp-md5");
const conn = require("../config/connection");
const insertUser = (req, res) => {
  
  let body = req.body;
  console.log(body);
  let fname = body.fname;
  let lname = body.lname;
  let email = body.email;
  let dob = body.dob;
  let pass = body.pass;
  let addr = body.addr;
  let salt = generateSalt();
  let key = generateLink();
  let encPass = md5(pass + salt);
  let allowUser = true;
  let delLink = true;
  let passResult;

  let pro = new Promise((resolve, reject) => {
    let sql1 = `select * from users`;
    conn.query(sql1, function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });

  pro.then((result) => {
    result.forEach(val => {
      if (email == val.email) {
        allowUser = false;
      }
    });
    return allowUser
  }).then((allowUser) => {
    if (allowUser == true) {
      let sql = `insert into users (firstName,lastName,email,dob,pass,address,key1,salt) values('${fname}','${lname}','${email}',str_to_date('${dob}','%d/%m/%Y'),'${encPass}','${addr}','${key}','${salt}')`;

      conn.query(sql, function (err, result) {
        if (err) throw err;
        passResult = result;
        console.log("Users Data submitted successfuly!");
      })
    }
    setTimeout(() => {
      let del_sql = `update users set key1 = null where key1='${key}'`;
      delLink = false;
      conn.query(del_sql, function (err, result) {
        if (err) throw err;
      });
    }, 5000);
    res.send({ key: key, email: email, pass: pass, passResult, salt, allowUser, delLink });
  });
}

function generateSalt() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let salt = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    salt += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return salt;
}

function generateLink() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let key = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    key += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return key;
}
module.exports = insertUser;