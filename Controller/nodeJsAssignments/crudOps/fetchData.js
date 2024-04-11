const conn = require('../../../config/connection');

try{
const fetchData = async(req, res) => {

  let result = await fetchBasicDetail(req, res);
  let education = await fetch_EducationData(req, res);
  let experience = await fetchExperienceData(req, res);
  let language = await fetchLanguageData(req, res);
  let reference = await fetchReferenceData(req, res);
  let preference = await fetchpreferenceData(req, res);
  res.render('./CRUD/update', { result: result[0], education, experience, language, reference, preference });

  function fetchBasicDetail(req, res) {
    let sql = `select * from basic_detail where emp_id = 4`;

    const promise = new Promise(function (myResolve, myReject) {
      conn.query(sql, function (err, result) {
        if (err) throw err;
        myResolve(result);
      });
    });
    return promise.then(function (result) {
      return result;
    });
  }

  function fetch_EducationData(req, res) {
    let edu_sql = `select * from education_detail where emp_id = 4`;

    const promise = new Promise(function (myResolve, myReject) {
      conn.query(edu_sql, function (err, result) {
        if (err) throw err;
          //console.log(result);
        myResolve(result)
      });
    });
    return promise.then(function (result) {
      return result;
    });
  
  }

  function fetchExperienceData(req, res) {
    console.log("in experienceData");

    let exp_sql = `select * from experience_detail where emp_id = 4`;

    const promise = new Promise(function (myResolve, myReject) {
      conn.query(exp_sql, function (err, result) {
        if (err) throw err;
          //console.log(result);
        myResolve(result);
      });
    });
    return promise.then(function (result) {
      return result;
    });
  }

  function fetchLanguageData(req, res) {
    console.log("in languageData");

    let lang_sql = `select * from language_detail where emp_id = 4`;

    const promise = new Promise(function (myResolve, myReject) {
      conn.query(lang_sql, function (err, result) {
        if (err) throw err;
          //console.log(result);
        myResolve(result);
      });
    });
    return promise.then(function (result) {
      return result;
    });
  }

  function fetchReferenceData(req, res) {
    console.log("in refenreceData");

    let ref_sql = `select * from reference_detail where emp_id = 4`;
    const promise = new Promise(function (myResolve, myReject) {
      conn.query(ref_sql, function (err, result) {
        if (err) throw err;
          //console.log(result);
        myResolve(result)
      });
    });
    return promise.then(function (result) {
      return result;
    });
  }

  function fetchpreferenceData(req, res) {
    console.log("in PreferenceData");

    let pref_sql = `select * from preference_detail where emp_id = 4`;

    const promise = new Promise(function (myResolve, myReject) {
      conn.query(pref_sql, function (err, result) {
        if (err) throw err;
          //console.log(result);
        myResolve(result)
      });
    });
    return promise.then(function (result) {
      return result;
    });
  }
}
}
catch(err){
  console.log(err);
}
module.exports = fetchData;
