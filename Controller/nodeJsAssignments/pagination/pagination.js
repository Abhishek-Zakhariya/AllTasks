const conn = require("../../../config/connection");

const pagination = (req, res) => {
  let pagesize = 10;

  let page = + req.query.page || 1;
  let start = (page - 1) * pagesize;
  let sql;
  // let sortby = req.query.sortby === 'desc' ? 'desc' : 'asc';
  let name = req.query.name;
  let oredrBY = (name) ? ` order by ${name}` : '';

  sql = `select stud_id,firstname,lastname,rollno,DATE_FORMAT(dob,'%d/%m/%y') as dob,sex,mobileno,email,city,state,postal_code from student_master ${oredrBY} limit 10 offset ${start}`;

  conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render('./Pagination/students', {
      data: result, page, name: name, oredrBY
    });
  });
}

module.exports = pagination;