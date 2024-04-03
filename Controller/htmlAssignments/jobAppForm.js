const path = require('path');
const publicPath = path.join(__dirname,'../','../','public');

const jobApp = (req,res) => {
  res.sendFile(`${publicPath}/Tasks/WireFrame/job_app_form5.html`);
};

module.exports = jobApp;