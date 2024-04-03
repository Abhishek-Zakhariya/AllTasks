const path = require('path');
const publicPath = path.join(__dirname,'../','../','public');

const hireX = (req,res) => {
  res.sendFile(`${publicPath}/Tasks/HTML_Assignment3/index.html`);
};

module.exports = hireX;