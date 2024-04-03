const path = require('path');
const publicPath = path.join(__dirname,'../','../','public')

const ticTacToe = (req, res) => {
  res.sendFile(`${publicPath}/Tasks/tic_tac_toe/tic_tac_toe.html`);
}

module.exports = ticTacToe;