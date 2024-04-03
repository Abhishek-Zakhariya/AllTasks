const path = require('path');
const publicPath = path.join(__dirname,'../','../','public');

const ehya = (req, res) => {
  res.sendFile(`${publicPath}/Tasks/HTML_Assignment1/File1.html`)
}
module.exports = ehya;