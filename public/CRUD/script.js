function clear_err() {
    let a = document.querySelectorAll('.err');
    let b = document.querySelectorAll('.staticerr');
    a.forEach(value => {
        value.remove()
    })
    b.forEach(value => {
        value.remove()
    })
}
function validate_require(control, msg) {
    control.parentNode.innerHTML += `<label class='err'>${msg}<label>`;
}
function ValidateForm() {
    let returnval = true;

    clear_err();

    /*-----------  Basic Detail Validation  -----------*/

    let fname = document.getElementById("fname");
    let errname = document.getElementById('errname');
    if (fname.value == '') {
        validate_require(fname, "Required*");
        returnval = false;
    }

    let lname = document.getElementById("lname");
    let errlname = document.getElementById('errlname');
    if (lname.value == '') {
        validate_require(lname, "Required*");
        returnval = false;
    }

    let male = document.getElementById('male');
    let female = document.getElementById('female');

    if (male.checked == false && female.checked == false) {
        let errradio = document.getElementById('errradio');
        validate_require(male, "Required*")
        returnval = false;
    }

    let rel = document.getElementById('Relationship');
    let errrel = document.getElementById('errrel');
    if (rel.value != 'Married' && rel.value != 'Unmarried' && rel.value != 'Divorced') {
        validate_require(rel, "Required*")
        returnval = false;
    }

    let mobno = document.getElementById("phnno");
    let errmob = document.getElementById("errmob");
    if (mobno.value.length != 10) {
        validate_require(mobno, "Required*")
        returnval = false;
    }

    let email = document.getElementById('email');
    let x = document.getElementById('email').value;
    var atposition = x.indexOf("@");
    var dotposition = x.lastIndexOf(".");
    if (email.value == '') {
        validate_require(email, "Required*");
        returnval = false;
    }
    else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
        validate_require(email, 'Enter Valid Email Adress!')
        returnval = false;
    }

    let dob = document.getElementById('dob');
    let errdob = document.getElementById('errdob');
    const dateregex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/

    if (dob.value.match(dateregex) == null) {
        validate_require(dob, "Enter Valid Date");
        returnval = false
    }

    /*-----------  Education Validation -----------*/

    let tencourse = document.getElementById('coursename3');
    let tenboard = document.getElementById('board');
    let tenpassyear = document.getElementById('pass_year');
    let tenpercentage = document.getElementById('percentage');
    let errtenperc = document.getElementById('errtenperc');

    if (tencourse.value != '') {
        if (tenboard.value == '') {
            validate_require(tenboard, "Required*");
            returnval = false;
        }
        if (tenpassyear.value == '') {
            validate_require(tenpassyear, "Required*");
            returnval = false
        }
        if (tenpercentage.value == '') {
            validate_require(tenpercentage, "Required*");
            returnval = false
        }
        else if (tenpercentage.value <= 0 || tenpercentage.value >= 100) {
            validate_require(tenpercentage, "Enter Valid Percentage");
            returnval = false
        }
    }


    let twelcourse = document.getElementById('coursename4');
    let twelboard = document.getElementById('board2');
    let twelpassyear = document.getElementById('pass_year2');
    let twelpercentage = document.getElementById('percentage2');
    let errtwelperc = document.getElementById('errperc2');

    if (twelcourse.value != '') {
        if (twelboard.value == '') {
            validate_require(twelboard, "Required*");
            returnval = false
        }
        if (twelpassyear.value == '') {
            validate_require(twelpassyear, "Required*");
            returnval = false
        }
        if (twelpercentage.value == '') {
            validate_require(twelpercentage, "Required*");
            returnval = false
        }
        else if (twelpercentage.value <= 0 || twelpercentage.value >= 100) {
            validate_require(twelpercentage, "Enter Valid Percentage");
            returnval = false
        }
    }

    let coursename = document.getElementById('coursename');
    let uni = document.getElementById('uni');
    let passyear3 = document.getElementById('pass_year3');
    let perc3 = document.getElementById('percentage3');
    let errperc3 = document.getElementById('errperc3');

    if (coursename.value != '') {
        if (uni.value == '') {
            validate_require(uni, "Required*");
            returnval = false
        }
        if (passyear3.value == '') {
            validate_require(passyear3, "Required*");
            returnval = false
        }
        if (perc3.value == '') {
            validate_require(perc3, "Required*");
            returnval = false
        }
        else if (perc3.value <= 0 || perc3.value >= 100) {
            validate_require(perc3, "Enter Valid Percentage");
            returnval = false
        }
    }


    let coursename2 = document.getElementById('coursename2');
    let uni2 = document.getElementById('uni2');
    let passyear4 = document.getElementById('pass_year4');
    let perc4 = document.getElementById('percentage4');
    let errperc4 = document.getElementById('errperc4');

    if (coursename2.value != '') {
        if (uni2.value == '') {
            validate_require(uni2, "Required*");
            returnval = false
        }
        if (passyear4.value == '') {
            validate_require(passyear4, "Required*");
            returnval = false
        }
        if (perc4.value == '') {
            validate_require(perc4, "Required*");
            returnval = false
        }
        else if (perc4.value <= 0 && perc4.value >= 100) {
            validate_require(perc4, "Enter Valid Percentage");
            returnval = false
        }
    }

    /*-----------  Experiance Validation -----------*/

    function compare_dates(start_date, end_date) {
        let start = new Date(start_date.value).getTime();
        let end = new Date(end_date.value).getTime();

        if (start > end) {
            return false
        }
    }

    let cmpnname = document.getElementById('cmpnname')
    let desig = document.getElementById('desig')
    let start_date = document.getElementById('start_date')
    let end_date = document.getElementById('end_date')
    let errdesign = document.getElementById('errdesign')
    let errstart = document.getElementById('errstart')
    let errend = document.getElementById('errend')

    if (cmpnname.value != '') {
        if (desig.value == '') {
            validate_require(desig, 'Required*')
            returnval = false
        }
        if (start_date.value == '') {
            validate_require(start_date, 'Required*')
            returnval = false
        }
        else if (start_date.value.match(dateregex) == null) {
            validate_require(start_date, 'Enter Valid Date')
            returnval = false
        }
        if (end_date.value == '') {
            validate_require(end_date, 'Required*')
            returnval = false
        }
        else if (end_date.value.match(dateregex) == null) {
            validate_require(end_date, "Enter Correct End Date!")
            returnval = false
        }
        if (compare_dates(start_date, end_date) == false) {
            errstart.innerHTML = "Enter Correct End Date!"
            returnval = false
        }
    }


    let cmpnname1 = document.getElementById('cmpnname1')
    let desig1 = document.getElementById('desig1')
    let start_date1 = document.getElementById('start_date1')
    let end_date1 = document.getElementById('end_date1')
    let errdesign1 = document.getElementById('errdesign1')
    let errstart1 = document.getElementById('errstart1')
    let errend1 = document.getElementById('errend1')


    if (cmpnname1.value != '') {
        if (desig1.value == '') {
            validate_require(desig1, 'Required*')
            returnval = false
        }
        if (start_date1.value == '') {
            validate_require(start_date1, 'Required*')
            returnval = false
        }
        else if (start_date1.value.match(dateregex) == null) {
            validate_require(start_date1, 'Enter Correct Start Date!')
            returnval = false
        }
        if (end_date1.value == '') {
            validate_require(end_date1, 'Required*')
            returnval = false
        }
        else if (end_date1.value.match(dateregex) == null) {
            validate_require(start_date1, 'Enter Correct End Date!')
            returnval = false
        }
        if (compare_dates(start_date1, end_date1) == false) {
            validate_require(start_date1, 'Start Date Cannot Be Greater Than End Date!')
            returnval = false
        }
    }

    let cmpnname2 = document.getElementById('cmpnname2')
    let desig2 = document.getElementById('desig2')
    let start_date2 = document.getElementById('start_date2')
    let end_date2 = document.getElementById('end_date2')
    let errdesign2 = document.getElementById('errdesign2')
    let errstart2 = document.getElementById('errstart2')
    let errend2 = document.getElementById('errend2')

    if (cmpnname2.value != '') {
        if (desig2.value == '') {
            validate_require(desig2, 'Required*')
            returnval = false
        }
        if (start_date2.value == '') {
            validate_require(start_date2, 'Required*')
            returnval = false
        } else if (start_date2.value.match(dateregex) == null) {
            errstart2.innerHTML = "Enter Correct Start Date!"
            returnval = false
        }
        if (end_date2.value == '') {
            validate_require(end_date2, 'Required*')
            returnval = false
        } else if (end_date2.value.match(dateregex) == null) {
            console.log("Entered In else if");
            validate_require(end_date2, "Enter Correct End Date!")
            returnval = false
        }
        if (compare_dates(start_date2, end_date2) == false) {
            validate_require(start_date2, 'Start Date Cannot Be Greater Than End Date!')
            returnval = false
        }
    }

    /*-----------  Technologies Validation -----------*/

    let php = document.getElementById('php');
    let beg1 = document.getElementById('beg1');
    let mid1 = document.getElementById('mid1');
    let exp1 = document.getElementById('exp1');
    let lblexp1 = document.getElementById('lblexp1');
    let errpro = document.getElementById('errpro');

    if (php.checked == true) {
        if (beg1.checked == false && mid1.checked == false && exp1.checked == false) {
            validate_require(lblexp1, "Please Check Proficiency in PHP")
            returnval = false;
        }
    }

    let mysql = document.getElementById('mysql');
    let beg2 = document.getElementById('beg2');
    let mid2 = document.getElementById('mid2');
    let exp2 = document.getElementById('exp2');
    let errpro2 = document.getElementById('errpro2');


    if (mysql.checked == true) {
        if (beg2.checked == false && mid2.checked == false && exp2.checked == false) {
            validate_require(lblexp2, "Please Check Proficiency in Mysql")
            returnval = false;
        }
    }

    let laravel = document.getElementById('laravel');
    let beg3 = document.getElementById('beg3');
    let mid3 = document.getElementById('mid3');
    let exp3 = document.getElementById('exp3');
    let errpro3 = document.getElementById('errpro3');

    if (laravel.checked == true) {
        if (beg3.checked == false && mid3.checked == false && exp3.checked == false) {
            validate_require(lblexp3, "Please Check Proficiency in Laravel")
            returnval = false;
        }
    }

    let oracle = document.getElementById('oracle');
    let beg4 = document.getElementById('beg4');
    let mid4 = document.getElementById('mid4');
    let exp4 = document.getElementById('exp4');
    let errpro4 = document.getElementById('errpro4');


    if (oracle.checked == true) {
        if (beg4.checked == false && mid4.checked == false && exp4.checked == false) {
            validate_require(lblexp4, "Please Check Proficiency in Oracle")
            returnval = false;
        }
    }


    let hindi = document.getElementById('hindi');
    let read1 = document.getElementById('read1');
    let write1 = document.getElementById('write1');
    let speak1 = document.getElementById('speak1');

    if (hindi.checked == true) {
        if (read1.checked != true && write1.checked != true && speak1.checked != true) {
            validate_require(speak1.parentNode, "Check Any Ability")
            returnval = false
        }
    }

    let english = document.getElementById('english');
    let read2 = document.getElementById('read2');
    let write2 = document.getElementById('write2');
    let speak2 = document.getElementById('speak2');


    if (english.checked == true) {
        if (read2.checked != true && write2.checked != true && speak2.checked != true) {
            validate_require(speak2.parentNode, "Check Any Ability")
            returnval = false
        }
    }

    let gujarati = document.getElementById('gujarati');
    let read3 = document.getElementById('read3');
    let write3 = document.getElementById('write3');
    let speak3 = document.getElementById('speak3');

    if (gujarati.checked == true) {
        if (read3.checked != true && write3.checked != true && speak3.checked != true) {
            validate_require(speak3.parentNode, "Check Any Ability")
            returnval = false
        }
    }


    /*  Reference  */

    let name = document.getElementById('name');
    let contact = document.getElementById('contact');
    let rel3 = document.getElementById('rel3');

    if (name.value != '') {
        if (contact.value == '') {
            validate_require(contact, "Required*");
            returnval = false;
        }
        else if (contact.value.length != 10) {
            validate_require(contact, "Number is Invalid!");
            returnval = false;
        }

        if (rel3.value == '') {
            validate_require(rel3, "Required*");
            returnval = false;
        }
    }

    let name2 = document.getElementById('name2');
    let contact2 = document.getElementById('contact2');
    let rel2 = document.getElementById('rel2');

    if (name2.value != '') {
        if (contact2.value == '') {
            validate_require(contact2, "Required*");
            returnval = false;
        }
        else if (contact2.value.length != 10) {
            validate_require(contact2, "Number is Invalid!");
            returnval = false;
        }
        if (rel2.value == '') {
            validate_require(rel2, "Required*");
            returnval = false;
        }
    }

    // Preferences

    let exp_ctc = document.getElementById('exp_ctc')
    let cur_ctc = document.getElementById('cur_ctc')

    if (exp_ctc.value == '') {
        validate_require(exp_ctc, "Required*");
        returnval = false
    }
    if (cur_ctc.value == '') {
        validate_require(cur_ctc, "Required*");
        returnval = false
    }

    return returnval;
}