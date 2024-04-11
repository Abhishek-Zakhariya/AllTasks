const conn = require('../../../config/connection');

try{
const insertAjax = (req, res) => {

  // let emp_id = req.body.emp_id;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let desg = req.body.designation;
  let gender = req.body.gender;
  let relationship = req.body.Relationship;
  let email = req.body.email;
  let phn_no = req.body.phnno;
  let addr1 = req.body.add1;
  let addr2 = req.body.add2;
  let city = req.body.city;
  let state = req.body.state;
  let dob = req.body.dob;

  let sql = `insert into basic_detail (fname,lname,designation,gender,dob,relationship,email,phn_no,addr1,addr2,city,state) values ("${fname}","${lname}","${desg}","${gender}",str_to_date('${dob}','%d/%m/%Y'),"${relationship}","${email}",${phn_no},"${addr1}","${addr2}","${city}","${state}")`;

  conn.query(sql, async function (err, result) {
    if (err) throw err;
    console.log("Basic Record Inserted Successfully..");
    EducationTable(req, res, result.insertId);
    ExperianceTable(req, res, result.insertId);
    ReferenceTable(req, res, result.insertId);
    PreferenceTable(req, res, result.insertId);
    (req.body.Language) ? LanguageTable(req, res, result.insertId) : '';
    (req.body.tech) ? TechTable(req, res, result.insertId) : '';
    res.render('./CURD_AJAX/form');
  });

  function EducationTable(req, res, emp_id) {
    var edu_sql;
    let edu_data = req.body;
    let coursename = req.body.coursename;
    let board = req.body.board;
    let pass_year = req.body.pass_year;
    let percentage = req.body.percentage;

    for (let i = 0; i < edu_data.board.length; i++) {

      if (coursename[i] == '' && board[i] == '' && pass_year[i] == '' && percentage[i] == '') {
        continue;
      }

      edu_sql = `insert into education_detail(emp_id,course_name,board_or_uni,pass_year,percentage)values(${emp_id},"${coursename[i]}","${board[i]}",${pass_year[i]},"${percentage[i]}")`;

      conn.query(edu_sql, function (err, result) {
        if (err) throw err;
        console.log("Education Record Inserted Successfully..");
      });
    }
  }

  function ExperianceTable(req, res, emp_id) {
    var exp_sql;
    let cmpname = req.body.cmpnname;
    let designation = req.body.desig;
    let from_date = req.body.start_date;
    let to_date = req.body.end_date;

    for (let i = 0; i < cmpname.length; i++) {

      if (cmpname[i] == '' && designation[i] == '' && from_date[i] == '' && to_date[i] == '') {
        continue;
      }

      exp_sql = `insert into experience_detail(emp_id,cmp_name,designation,from_date,to_date)values(${emp_id},"${cmpname[i]}","${designation[i]}",str_to_date('${from_date[i]}','%d/%m/%Y'),str_to_date('${to_date[i]}','%d/%m/%Y'))`;

      conn.query(exp_sql, function (err, result) {
        if (err) throw err;
        console.log("Experience Record Inserted Successfully..");
      })
    }
  }

  function ReferenceTable(req, res, emp_id) {
    var ref_sql;
    let name = req.body.name;
    let cont = req.body.contact;
    let relation = req.body.rel;
    for (let i = 0; i < name.length; i++) {

      if (name[i] == '' && cont[i] == '' && relation[i] == '') {
        continue;
      }

      ref_sql = `insert into reference_detail(emp_id,name,contact,relation)values(${emp_id},"${name[i]}",${cont[i]},'${relation[i]}')`;

      conn.query(ref_sql, function (err, result) {
        if (err) throw err;
        console.log("Reference Record Inserted Successfully..");
      })
    }
  }

  function PreferenceTable(req, res, emp_id) {
    var pre_sql;
    let location = req.body.loc;
    let notice = req.body.notice;
    let exp_ctc = req.body.exp_ctc;
    let cur_ctc = req.body.cur_ctc;
    let department = req.body.dept;

    var pre_sql = `insert into preference_detail(emp_id,location,notice_period,exp_ctc,cur_ctc,dept) values (${emp_id},"${location}","${notice}",${exp_ctc},${cur_ctc},"${department}")`;

    conn.query(pre_sql, function (err, result) {
      if (err) throw err;
      console.log("Preference Records Inserted Successfully..");
    })
  }

  function LanguageTable(req, res, emp_id) {
    var lang_sql;
    let language = req.body.Language;
    let hindi = req.body.hindi;
    let english = req.body.english;
    let gujarati = req.body.gujarati;

    console.log("Enter Language");
    let value = [];
    for (let i = 0; i < language.length; i++) {
      if (language[i] == 'hindi') {
        for (let j = 0; j < hindi.length; j++) {
          value.push(`(${emp_id},'${language[i]}','${hindi[j]}')`);
        }
      }
      if (language[i] == 'english') {
        for (let j = 0; j < english.length; j++) {
          value.push(`(${emp_id},'${language[i]}','${english[j]}')`);
        }
      }
      if (language[i] == 'gujarati') {
        for (let j = 0; j < gujarati.length; j++) {
          value.push(`(${emp_id},'${language[i]}','${gujarati[j]}')`);
        }
      }
    }
    let str = value.join(",")
    lang_sql = `insert into language_detail(emp_id,language,ability) values ${str}`;

    conn.query(lang_sql, function (err, result) {
      if (err) throw err;
      console.log("Language Record Inserted Successfully..");
    })
  }

  function TechTable(req, res, emp_id) {

    var tech_sql;
    let skill;
    let tech = req.body.tech;
    let skill1 = req.body.skill1;
    let skill2 = req.body.skill2;
    let skill3 = req.body.skill3;
    let skill4 = req.body.skill4;

    let value = [];

    for (let i = 0; i < tech.length; i++) {
      if (tech[i] == 'php') {
        value.push(`(${emp_id},'${tech[i]}','${skill1}')`);
      }
      if (tech[i] == 'mysql') {
        value.push(`(${emp_id},'${tech[i]}','${skill2}')`);
      }
      if (tech[i] == 'laravel') {
        value.push(`(${emp_id},'${tech[i]}','${skill3}')`);
      }
      if (tech[i] == 'oracle') {
        value.push(`(${emp_id},'${tech[i]}','${skill4}')`);
      }
    }
    let str = value.join(",")
    tech_sql = `insert into techno_detail (emp_id,technology,proficiency) values ${str}`;

    conn.query(tech_sql, function (err, result) {
      if (err) throw err;
      console.log("Technology Record Inserted Successfully..");
    })
  }

}
}
catch(err){
  console.log(err);
}

module.exports = insertAjax;
