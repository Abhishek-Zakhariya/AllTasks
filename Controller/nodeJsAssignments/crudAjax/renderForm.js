const conn = require('../../../config/connection');

const renderForm = (req,res) => {
  res.render('./CURD_AJAX/form');
}

module.exports = renderForm;