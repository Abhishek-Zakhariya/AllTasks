const path = require('path');
const publicPath = path.join(__dirname,'../','../','public')

const kukuCube = (req, res) => {
  res.sendFile(`${publicPath}/Tasks/KukuCube/KookuCube.html`);
}

module.exports = kukuCube;