const conn = require("../config/connection");
const welcome = (req, res) => {
  let key2 = req.params.key;

  //user timeout pela link upr click krse to active thy jase other wise key delete thy jase etle update ni query work ny kre ane activeUser = 0 j rese 

  let sql = `update users set activeUser = 1 where key1 = '${key2}'`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Updated Successfully");
  })

  //user select thase and jo e active hse to ene welcome vada page upr redirect krva ma aavse otherwise ene index upr redirect krva ma avse

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