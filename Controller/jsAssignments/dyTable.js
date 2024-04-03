const path = require('path');
const publicPath = path.join(__dirname,'../','../','public');

const dyTable = (req, res) => {
  res.sendFile(`${publicPath}/Tasks/DynamicTable/Dynamic_table.html`);
}

module.exports = dyTable;