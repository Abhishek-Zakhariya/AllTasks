const conn = require("../config/connection");
const regeneratePass = async (req, res) => {

  let delLink = true;
  let email = req.body.email1;
  let key = await generateLink();
  console.log(key);

  let sql = `update users set key1 = '${key}' where email = '${email}'`;
  conn.query(sql, function (err, result) {
    console.log("update1");
    if (err) throw err;
  });

  setTimeout(() => {
    let sql1 = `update users set key1 = null where email='${email}'`;
    conn.query(sql1, function (err, result) {
      console.log("update2");
      if (err) throw err;
      delLink = false;
    });
  }, 10000);
  res.send({ key: key, delLink: delLink });
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

module.exports = regeneratePass;
