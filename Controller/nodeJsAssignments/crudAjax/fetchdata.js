const conn = require('../../../config/connection');

const fetchAjax = async (req, res) => {
  let emp_id = req.params.id;
  let result = await fetchBasicDetail(req, res);
  let education = await fetch_EducationData(req, res);
  let experience = await fetchExperienceData(req, res);
  let language = await fetchLanguageData(req, res);
  let technology = await fetchTechData(req, res);
  let reference = await fetchReferenceData(req, res);
  let preference = await fetchpreferenceData(req, res);
  res.render('./CURD_AJAX/update', { result: result[0], education, experience, language, technology, reference, preference: preference[0], emp_id });
}

async function fetchBasicDetail(req, res) {
  var id = req.params.id;
  let sql = `select * from  basic_detail where emp_id = ${id}`;
  const promise = new Promise(function (myResolve, myReject) {
    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      myResolve(result);
    })
  })
  return await promise.then(function (result) {
    return result;
  })
}

async function fetch_EducationData(req, res) {
  var id = req.params.id;
  let sql = `select * from education_detail where emp_id = ${id}`;

  const promise = new Promise(function (myResolve, myReject) {
    conn.query(sql, function (err, result) {
      if (err) throw err;
      myResolve(result);
    })
  })
  return await promise.then(function (result) {
    return result;
  })
}

async function fetchExperienceData(req, res) {
  var id = req.params.id;
  let sql = `select * from experience_detail where emp_id = ${id}`;

  const promise = new Promise(function (myResolve, myReject) {
    conn.query(sql, function (err, result) {
      if (err) throw err;
      myResolve(result);
    })
  })
  return await promise.then(function (result) {
    return result;
  })
}

async function fetchLanguageData(req, res) {
  var id = req.params.id;
  let sql = `select * from language_detail where emp_id = ${id}`;

  const promise = new Promise(function (myResolve, myReject) {
    conn.query(sql, function (err, result) {
      if (err) throw err;
      myResolve(result);
    })
  })
  return await promise.then(function (result) {
    return result;
  })
}

async function fetchTechData(req, res) {
  var id = req.params.id;
  let sql = `select * from techno_detail where emp_id = ${id}`;

  const promise = new Promise(function (myResolve, myReject) {
    conn.query(sql, function (err, result) {
      if (err) throw err;
      myResolve(result);
    })
  })
  return await promise.then(function (result) {
    return result;
  })
}

async function fetchReferenceData(req, res) {

  var id = req.params.id;
  let sql = `select * from reference_detail where emp_id = ${id}`;

  const promise = new Promise(function (myResolve, myReject) {
    conn.query(sql, function (err, result) {
      if (err) throw err;
      myResolve(result);
    })
  })
  return await promise.then(function (result) {
    return result;
  })
}

async function fetchpreferenceData(req, res) {
  var id = req.params.id;
  let sql = `select * from preference_detail where emp_id = ${id}`;

  const promise = new Promise(function (myResolve, myReject) {
    conn.query(sql, function (err, result) {
      if (err) throw err;
      myResolve(result);
    })
  })
  return await promise.then(function (result) {
    return result;
  })
}

module.exports = fetchAjax;