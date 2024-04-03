const jwtMiddleWare = require('./MiddleWare/checkActiveUser');

require('dotenv').config();
function route(app, conn, md5, jwt) {

    app.get('/register', (req, res) => {
        res.render('index');
    })

    app.get('/', (req, res) => {
        res.render('loginForm');
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
 
        let pro = new Promise((resolve, reject) => {
            let sql1 = `select * from users`;
            conn.query(sql1, function (err, result) {
                if (err) throw err;
                resolve(result);
            });
        });
        
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
        let matched = false;

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
                matched = true;
                let token = jwt.sign({ email: email }, process.env.secKey);
                res.cookie('token', token, { maxAge: 1000 * 10 * 10, httpOnly: true }).json({ code: 200 });
            }
            else {
                matched = false;
                res.json({ code: 300 });
            }
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

    app.get('/deshboard', jwtMiddleWare, async (req, res) => {
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

    app.get('/HireX', (req, res) => {
        res.sendFile('/home/abhishek-zakhaniya/NodeJs/AllTasks/public/Tasks/HTML_Assignment3/index.html')
    })

    app.get('/FetchAPI', (req, res) => {
        res.render('./FetchAPI_JsonPlaceHolder/posts.ejs');
    });

    app.get('/singlepost/:id', (req, res) => {
        res.render('./FetchAPI_JsonPlaceHolder/singlePost.ejs');
    });

    app.get('/Pagination', (req, res) => {
        let pagesize = 10;
        console.log("reached");
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
    });

    app.get('/Attendence', (req, res) => {
        let page = + req.query.page || 1;
        let start = (page - 1) * 10;

        let month = req.query.month || '12';
        let year = req.query.year || '2023';

        let sql = `select a.stud_id,s.firstname,count(a.day) as presentdays,
            round(count(a.stud_id)/0.3) as percentage
            from student s left join attendence a on s.stud_id=a.stud_id 
            where a.records = 'present' and date_format(day,'%m-%y') = date_format('${year}-${month}-01','%m-%y') group by s.stud_id order by stud_id limit 10 offset ${start}`;

        conn.query(sql, function (err, result) {
            if (err) throw err;
            res.render('./Attendence/attendence', { data: result, page, month, year });
        });
    });

    app.get('/Crud', (req, res) => {
        res.render('./CRUD/form');
    })

    app.post('/insertdata', (req, res) => {

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

        var sql = `insert into basic_detail (fname,lname,designation,gender,dob,relationship,email,phn_no,addr1,addr2,city,state) values ("${fname}","${lname}","${desg}","${gender}",str_to_date('${dob}','%d/%m/%Y'),"${relationship}","${email}",${phn_no},"${addr1}","${addr2}","${city}","${state}")`;

        var lastId;

        conn.query(sql, async function (err, result) {
            if (err) throw err;
            console.log("Basic Record Inserted Successfully..");
            EducationTable(req, res, result.insertId);
            ExperianceTable(req, res, result.insertId);
            ReferenceTable(req, res, result.insertId);
            PreferenceTable(req, res, result.insertId);
            (req.body.Language) ? LanguageTable(req, res, result.insertId) : '';
            (req.body.tech) ? TechTable(req, res, result.insertId) : '';
            res.render('./CRUD/form', { lastId: result.insertId });
        })
    })

    function EducationTable(req, res, emp_id) {
        console.log(req.body);
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
            edu_sql = `insert into education_detail(emp_id,course_name,board_or_uni,pass_year,percentage)values(${emp_id},"${coursename[i]}","${board[i]}",${pass_year[i]},${percentage[i]})`;

            conn.query(edu_sql, function (err, result) {
                if (err) throw err;
                console.log("Education Record Inserted Successfully..");
            })
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

    app.get('/edit', async (req, res) => {

        let result = await fetchBasicDetail(req, res);
        let education = await fetch_EducationData(req, res);
        let experience = await fetchExperienceData(req, res);
        let language = await fetchLanguageData(req, res);
        let reference = await fetchReferenceData(req, res);
        let preference = await fetchpreferenceData(req, res);
        res.render('./CRUD/update', { result: result[0], education, experience, language, reference, preference });

    })

    async function fetchBasicDetail(req, res) {
        let sql = `select * from basic_detail where emp_id = 4`;

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

    async function fetch_EducationData(req, res) {
        let edu_sql = `select * from education_detail where emp_id = 4`;

        const promise = new Promise(function (myResolve, myReject) {
            conn.query(edu_sql, function (err, result) {
                if (err) throw err;
                myResolve(result)
            })
        })
        return await promise.then(function (result) {
            return result
        })
    }

    async function fetchExperienceData(req, res) {
        let exp_sql = `select * from experience_detail where emp_id = 4`;

        const promise = new Promise(function (myResolve, myReject) {
            conn.query(exp_sql, function (err, result) {
                if (err) throw err;
                myResolve(result)
            })
        })
        return await promise.then(function (result) {
            return result
        })
    }

    async function fetchLanguageData(req, res) {
        let lang_sql = `select * from language_detail where emp_id = 4`;

        const promise = new Promise(function (myResolve, myReject) {
            conn.query(lang_sql, function (err, result) {
                if (err) throw err;
                myResolve(result)
            })
        })
        return await promise.then(function (result) {
            return result
        })
    }

    async function fetchReferenceData(req, res) {
        let ref_sql = `select * from reference_detail where emp_id = 4`;

        const promise = new Promise(function (myResolve, myReject) {
            conn.query(ref_sql, function (err, result) {
                if (err) throw err;
                myResolve(result)
            })
        })
        return await promise.then(function (result) {
            return result;
        })
    }

    async function fetchpreferenceData(req, res) {
        let pref_sql = `select * from preference_detail where emp_id = 4`;

        const promise = new Promise(function (myResolve, myReject) {
            conn.query(pref_sql, function (err, result) {
                if (err) throw err;
                myResolve(result)
            })
        })
        return await promise.then(function (result) {
            return result;
        })
    }

    app.post('/edit', (req, res) => {
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

        var sql = `update basic_detail set fname = "${fname}",lname =" ${lname}",designation = "${desg}",
        gender = "${gender}",dob = "${dob}",relationship = "${relationship}",email = "${email}",phn_no = ${phn_no},addr1 = "${addr1}",addr2 = "${addr2}",city = "${city}", state = "${state}"`;

        var lastId;

        conn.query(sql, async function (err, result) {
            if (err) throw err;
            console.log("Basic Record Updated Successfully..");
            // EducationTable(req, res, result.insertId);
            // ExperianceTable(req, res, result.insertId);
            // ReferenceTable(req, res, result.insertId);
            // PreferenceTable(req, res, result.insertId);
            // (req.body.Language) ? LanguageTable(req, res, result.insertId) : '';
            // (req.body.tech) ? TechTable(req, res, result.insertId) : '';
            res.render('./CRUD/form');
        })

    })

    // CRUD WITH AJAX
    app.get('/CurdAjax', (req, res) => {
        res.render('./CURD_AJAX/form');
    });

    app.post('/insert', (req, res) => {

        let emp_id = req.body.emp_id;
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

        var sql = `insert into basic_detail (fname,lname,designation,gender,dob,relationship,email,phn_no,addr1,addr2,city,state) values ("${fname}","${lname}","${desg}","${gender}",str_to_date('${dob}','%d/%m/%Y'),"${relationship}","${email}",${phn_no},"${addr1}","${addr2}","${city}","${state}")`;

        var lastId;

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
        })

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
                })
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
    });


    app.post('/update', async (req, res) => {
        let emp_id = req.body.id;
        await updateBasicDetail(req, res);
        await updateEducationDetail(req, res);
        await updateExperianceDetail(req, res, emp_id);
        await updateLanguageDetail(req, res, emp_id);
        await updateReferenceDetail(req, res, emp_id);
        await updatePreferenceDetail(req, res, emp_id);
    });

    function updateBasicDetail(req, res) {
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

        let sql = `update basic_detail set fname = "${fname}",lname = "${lname}",designation="${desg}",gender = "${gender}",dob = "${dob}" ,relationship ="${relationship}",email = "${email}", phn_no=${phn_no},addr1 = "${addr1}",addr2 = "${addr2}",city = "${city}",state = "${state}" where emp_id = ${emp_id}`;

        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Basic Data Updated!");
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
            console.log("Deleted");
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

    app.get('/edit/:id', async (req, res) => {

        let emp_id = req.params.id;
        let result = await fetchBasicDetail(req, res);
        let education = await fetch_EducationData(req, res);
        let experience = await fetchExperienceData(req, res);
        let language = await fetchLanguageData(req, res);
        let technology = await fetchTechData(req, res);
        let reference = await fetchReferenceData(req, res);
        let preference = await fetchpreferenceData(req, res);
        res.render('./CURD_AJAX/update', { result: result[0], education, experience, language, technology, reference, preference: preference[0], emp_id });
    })

    async function fetchBasicDetail(req, res) {

        var id = req.params.id;
        let sql = `select * from  basic_detail where emp_id = ${id}`;
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

    app.get('/JobAppForm', (req, res) => {
        res.sendFile('/home/abhishek-zakhaniya/NodeJs/AllTasks/public/Tasks/WireFrame/job_app_form5.html');
    })

    app.get('/DyComponent', (req, res) => {

        let input = req.query.search;
        let sql = `select s.sname,s.control_name,s.class,o.op_key,sop.sub_option_id,sop.sub_op_key,sop.sub_op_key1,sop.sub_op_key2 from selectMasterDyComp s inner join optionMasterDyComp o on s.sid = o.sid inner join subOptionMasterDyComp sop on o.op_id = sop.op_id where s.sname = '${input}'`;

        conn.query(sql, function (err, result, fields) {
            console.log(result);
            if (err) throw err;
            res.render('./DyComponent/input', { input, result });
        })
    })

    app.get('/DelimeterSearch', (req, res) => {

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
    });
}

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

module.exports = route;