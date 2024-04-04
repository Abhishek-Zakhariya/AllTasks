const conn = require('../../config/connection');
const delimeterSearch = (req, res) => {

  let fetchData1 = req.query.query || '';
  let fetchData = req.query.query || '';

  let specialChar = [
    '_',
    '^',
    '$',
    ':'
  ];

  fetchData = fetchData.replace(/['_']/g, ' firstname ');
  fetchData = fetchData.replace(/['^']/g, ' lastname ');
  fetchData = fetchData.replace(/[':']/g, ' city ');
  fetchData = fetchData.replace(/['$']/g, ' mobileno ');

  let newdata = fetchData.split(' ');
  console.log(newdata);

  let obj = {};
  for (let i = 0; i < newdata.length - 1; i += 2) {
    obj[newdata[i + 1]] = newdata[i + 2];
  }

  let obj1 = {
    firstname: [],
    lastname: [],
    city: [],
    mobileno: []
  }

  for (let i = 1; i < newdata.length; i += 2) {
    (obj1[`${newdata[i]}`]) ? obj1[`${newdata[i]}`].push(`${newdata[i + 1]}`) : '';
  }
  console.log(obj1);

  let arr = [];
  let arr1 = [];
  for (const i in obj1) {
    if (obj1[i].length > 1) {
      for (let j of obj1[i]) {
        (`${obj1[i]}`) ? arr.push(`${i} like '${j}'`) : '';
      }
      let arrjoin = arr.join(' or ');
      arr1.push(`(${arrjoin})`);
      console.log(arr);
      arr = [];
    } else {
      (`${obj1[i]}`) ? arr1.push(`${i} like '${obj1[i]}'`) : '';
    }
  }
  console.log(arr1);

  let where = (fetchData) ? `where ${arr1.join(' and ')}` : '';

  let sql = `select stud_id,firstname,lastname,rollno,date_format(dob,'%d-%m-%y')as dob,sex,mobileno,email,city,state,postal_code from student_master ${where} limit 10`;

  conn.query(sql, function (err, result) {
    console.log(sql);
    if (err) throw err;
    res.render('./DelimeterSearch/students', { data: result, fetchData1 });
  });
}
module.exports = delimeterSearch;