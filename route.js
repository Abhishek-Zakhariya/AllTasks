function route(app, conn, md5) {

    app.get('/login', (req, res) => {
        res.render('loginForm');
    })

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.post('/insert', async (req, res) => {
        let body = req.body;
        let fname = body.fname;
        let lname = body.lname;
        let email = body.email;
        let dob = body.dob;
        let pass = body.pass;
        let addr = body.addr;
        let salt = generateSalt();
        let key = generateLink();
        let encPass = md5(pass + salt);
        let allow = true;
        let delLink = true;
        let passResult;

        //users select thase 
        let pro = new Promise((resolve, reject) => {
            let sql1 = `select * from users`;
            conn.query(sql1, function (err, result) {
                if (err) throw err;
                resolve(result);
            });
        });
        //check krse already email used chhe k ny
        pro.then((result) => {
            result.forEach(val => {
                if (email == val.email) {
                    allow = false;
                }
            });
            return allow
        }).then((allow) => {
            if (allow == true) {
                let sql = `insert into users (firstName,lastName,email,dob,pass,address,key1,salt) values('${fname}','${lname}','${email}',str_to_date('${dob}','%d/%m/%Y'),'${encPass}','${addr}','${key}','${salt}')`;

                conn.query(sql, function (err, result) {
                    if (err) throw err;
                    passResult = result;
                    console.log("Users Data submitted successfuly!");
                })
            }
            setTimeout(() => {
                let del_sql = `update users set key1 = null where key1='${key}'`;
                delLink = false;
                conn.query(del_sql, function (err, result) {
                    if (err) throw err;
                });
            }, 5000);
            res.send({ key: key, email: email, pass: pass, passResult, salt, allow, delLink });
        });
    });

    app.post('/login', async (req, res) => {

        let email = req.body.email;
        let pass = req.body.pass;
        let a = false;

        let pro = new Promise((resolve, reject) => {
            let sql = `select * from users where email = '${email}'`;
            conn.query(sql, function (err, result) {
                if (err) throw err;
                resolve(result);
            });
        });

        pro.then((result) => {
            let encPass = md5(pass + result[0].salt);
            if (result[0].pass == encPass && result[0].activeUser == 1) {
                a = true;
                console.log("matched");
            }
            else {
                console.log("Unmatched");
                a = false;
            }
            res.send({ a: a })
        });
    });

    app.get('/welcome/:key', (req, res) => {
        let key2 = req.params.key;

        //user timeout pela link upr click krse to active thy jase other wise key delete thy jase etle update ni query work ny kre ane activeUser = 0 j rese 

        let sql = `update users set activeUser = 1 where key1 = '${key2}'`;
        console.log(sql);
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Updated Successfully");
        })

        //user select thase and jo e active hse to ene welcome vada page upr redirect krva ma aavse otherwise ene index upr redirect krva ma avse

        let sqlCheckuser = `select * from users where key1 = '${key2}'`;
        console.log(sqlCheckuser);
        new Promise((resolve, reject) => {
            conn.query(sqlCheckuser, function (err, result) {
                if (err) throw err;
                resolve(result);
            })
        }).then((result) => {
            console.log(result);
            if (result[0]?.activeUser == 1) {
                res.render('loginForm', { name: result[0].firstName, lname: result[0].lastName });
            }
            else {
                res.render('index');
            }
        });
    });

    app.get('/forgotPass', (req, res) => {
        res.render('forgotPass');
    });

    app.post('/regeneratePass', async (req, res) => {
        let delLink = true;
        let email = req.body.email1;
        let key = await generateLink();

        let sql = `update users set key1 = '${key}' where email = '${email}'`;
        conn.query(sql, function (err, result) {
            console.log("update1");
            if (err) throw err;
        });

        setTimeout(() => {
            let sql1 = `update users set key1 = null where email='${email}'`;
            conn.query(sql1, function (err, result) {
                console.log("update2");
                if (err) throw err;
                delLink = false;
            });
        }, 10000);
        res.send({ key: key, delLink: delLink });
    });

    app.get('/deshboard', async (req, res) => {
        res.render('deshboard');
    })

    app.get('/tic_tac_toe', (req, res) => {
        res.sendFile("/home/abhishek-zakhaniya/NodeJs/AllTasks/public/Tasks/tic_tac_toe/tic_tac_toe.html");
    });

    app.get('/kukuCube', (req, res) => {
        res.sendFile("/home/abhishek-zakhaniya/NodeJs/AllTasks/public/Tasks/KukuCube/KookuCube.html");
    });

    app.get('/ehya', (req, res) => {
        res.sendFile("/home/abhishek-zakhaniya/NodeJs/AllTasks/public/Tasks/HTML_Assignment1/File1.html");
    });

    app.get('/DyTable', (req, res) => {
        res.sendFile('/home/abhishek-zakhaniya/NodeJs/AllTasks/public/Tasks/DynamicTable/Dynamic_table.html')
    })

    app.get('/AwanHoster', (req, res) => {
        res.sendFile('/home/abhishek-zakhaniya/NodeJs/AllTasks/public/Tasks/HTML_Assignment2/index.html')
    })

    function generateSalt() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let salt = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
            salt += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return salt;
    }

    function generateLink() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let key = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 12; i++) {
            key += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return key;
    }
}
module.exports = route;