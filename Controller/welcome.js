const conn = require("../config/connection");
const welcome = (req, res) => {
  let key2 = req.params.key;
  
  let sql = `update users set activeUser = 1 where key1 = '${key2}'`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Updated Successfully");
  })

  let sqlCheckuser = `select * from users where key1 = '${key2}'`;
  console.log(sqlCheckuser);
  new Promise((resolve, reject) => {
    conn.query(sqlCheckuser, function (err, result) {
      if (err) throw err;
      resolve(result);
    })
  }).then((result) => {
    console.log(result);
    if (result[0]?.activeUser == 1) {
      res.render('loginForm', { name: result[0].firstName, lname: result[0].lastName });
    }
    else {
      res.render('index');
    }
  });
}

module.exports = welcome;