const conn = require('../../../config/connection');
try{
const updateData = async (req, res) => {
  let emp_id = req.body.id;
  await updateBasicDetail(req, res);
  await updateEducationDetail(req, res);
  await updateExperianceDetail(req, res, emp_id);
  await updateLanguageDetail(req, res, emp_id);
  await updateReferenceDetail(req, res, emp_id);
  await updatePreferenceDetail(req, res, emp_id);
}
function updateBasicDetail(req, res) {
  console.log(req.body);
  let emp_id = req.body.id
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
  console.log(dob);

  let sql = `update basic_detail set fname = "${fname}",lname = "${lname}",designation="${desg}",gender = "${gender}",dob = "${dob}",relationship ="${relationship}",email = "${email}", phn_no=${phn_no},addr1 = "${addr1}",addr2 = "${addr2}",city = "${city}",state = "${state}" where emp_id = ${emp_id}`;

  conn.query(sql, function (err, result) {
    if (err) throw err;
    
  })
}

function updateEducationDetail(req, res) {
  let edu_data = req.body;
  let emp_id = edu_data.id;
  let coursename = req.body.coursename;
  let board = req.body.board;
  let pass_year = req.body.pass_year;
  let percentage = req.body.percentage;

  let sql = `delete from education_detail where emp_id = ${emp_id}`
  conn.query(sql, function (err) {
    if (err) throw err;
    
  })

  for (let i = 0; i < edu_data.board.length; i++) {


    if (coursename[i] == '' && board[i] == '' && pass_year[i] == '' && percentage[i] == '') {
      continue;
    }

    // let sql = `update education_detail set course_name = "${coursename[i]}",board_or_uni ="${board[i]}",pass_year=${pass_year[i]},percentage=${percentage[i]} where emp_id = ${emp_id}`;

    let sql1 = `insert into education_detail(emp_id,course_name,board_or_uni,pass_year,percentage)values(${emp_id},"${coursename[i]}","${board[i]}",${pass_year[i]},"${percentage[i]}")`;

    conn.query(sql1, function (err, result) {
      if (err) throw err;
      console.log("Education Record Updated Successfully..");
    })
  }
}

function updateExperianceDetail(req, res, emp_id) {

  let cmpname = req.body.cmpnname;
  let designation = req.body.desig;
  let from_date = req.body.start_date;
  let to_date = req.body.end_date;

  let sql = `delete from experience_detail where emp_id = ${emp_id}`;
  conn.query(sql, function (err) {
    if (err) throw err;
    console.log("Deleted Experience");
  })

  for (let i = 0; i < cmpname.length; i++) {

    if (cmpname[i] == '' && designation[i] == '' && from_date[i] == '' && to_date[i] == '') {
      continue;
    }

    let sql1 = `insert into experience_detail(emp_id,cmp_name,designation,from_date,to_date)values(${emp_id},"${cmpname[i]}","${designation[i]}",str_to_date('${from_date[i]}','%Y-%m-%d'),str_to_date('${to_date[i]}','%Y-%m-%d'))`;

    conn.query(sql1, function (err, result) {
      if (err) throw err;
      console.log("Experience Record Updated Successfully..");
    })
  }
}

function updateLanguageDetail(req, res, emp_id) {
  var lang_sql;
  let language = req.body.Language;
  let hindi = req.body.hindi;
  let english = req.body.english;
  let gujarati = req.body.gujarati;

  let sql = `delete from language_detail where emp_id = ${emp_id}`

  conn.query(sql, function (err) {
    if (err) throw err;
    console.log("deleted from language");
  })

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
    console.log("Language Record Updated Successfully..");
  })

}

function updateReferenceDetail(req, res, emp_id) {

  let sql = `delete from reference_detail where emp_id = ${emp_id}`;
  conn.query(sql, (err) => {
    if (err) throw err;
    console.log("Deleted Reference");
  })

  let name = req.body.name;
  let cont = req.body.contact;
  let relation = req.body.rel;
  for (let i = 0; i < name.length; i++) {

    if (name[i] == '' && cont[i] == '' && relation[i] == '') {
      continue;
    }

    // let sql = `update reference_detail set name = "${name[i]}",contact = ${cont[i]},relation="${relation[i]}" where emp_id = ${emp_id}`;
    let sql1 = `insert into reference_detail(emp_id,name,contact,relation)values(${emp_id},"${name[i]}",${cont[i]},'${relation[i]}')`;

    conn.query(sql1, function (err, result) {
      if (err) throw err;
      console.log("Reference Record Updated Successfully..");
    })
  }
}


function updatePreferenceDetail(req, res, emp_id) {


  let location = req.body.loc;
  let notice = req.body.notice;
  let exp_ctc = req.body.exp_ctc;
  let cur_ctc = req.body.cur_ctc;
  let department = req.body.dept;

  let sql = `update preference_detail set location = "${location}",notice_period="${notice}",exp_ctc=${exp_ctc},cur_ctc=${cur_ctc},dept="${department}"`;

  // var pre_sql = `insert into preference_detail(emp_id,location,notice_period,exp_ctc,cur_ctc,dept) values (${emp_id},"${location}","${notice}",${exp_ctc},${cur_ctc},"${department}")`;

  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Preference Records Updated Successfully..");
  })
}
}
catch(err){
  console.log(err);
}


module.exports = updateData
