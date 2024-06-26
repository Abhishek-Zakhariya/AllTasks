const jwt = require('jsonwebtoken');
require('dotenv').config();
try{
const jwtMiddleWare = async (req, res, next) => {
    const token = req.cookies['token'];

    if (token) {
        jwt.verify(token, process.env.secKey, (err, email) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        })
    }
    else {
        res.redirect('/');
    }
}
}
catch(err){
    console.log(err);
}
module.exports = jwtMiddleWare;
