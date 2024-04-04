const conn = require('../../../config/connection');
const dycomponent = (req, res) => {
  let input = req.query.search;
  let sql = `select s.sname,s.control_name,s.class,o.op_key,sop.sub_option_id,sop.sub_op_key,sop.sub_op_key1,sop.sub_op_key2 from selectMasterDyComp s inner join optionMasterDyComp o on s.sid = o.sid inner join subOptionMasterDyComp sop on o.op_id = sop.op_id where s.sname = '${input}'`;

  conn.query(sql, function (err, result, fields) {
    console.log(result);
    if (err) throw err;
    res.render('./DyComponent/input', { input, result });
  });
}
module.exports = dycomponent;