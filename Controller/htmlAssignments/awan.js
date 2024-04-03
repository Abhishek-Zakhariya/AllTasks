const path = require('path');
const publicPath = path.join(__dirname,'../', '../', 'public');

const awan = (req, res) => {
  res.sendFile(`${publicPath}/Tasks/HTML_Assignment2/index.html`);
};

module.exports = awan;