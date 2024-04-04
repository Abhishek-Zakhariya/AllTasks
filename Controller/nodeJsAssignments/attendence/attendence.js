const conn = require("../../../config/connection");
const attendence = (req, res) => {
  let page = + req.query.page || 1;
  let start = (page - 1) * 10;

  let month = req.query.month || '12';
  let year = req.query.year || '2023';

  let sql = `select a.stud_id,s.firstname,count(a.day) as presentdays,
          any_value(round(count(a.stud_id)/0.3)) as percentage
          from student s left join attendence a on s.stud_id=a.stud_id 
          where a.records = 'present' and date_format(day,'%m-%y') = date_format('${year}-${month}-01','%m-%y') group by s.stud_id order by stud_id limit 10 offset ${start}`;

  conn.query(sql, function (err, result) {
    if (err) throw err;
    res.render('./Attendence/attendence', { data: result, page, month, year });
  });
}
module.exports = attendence;