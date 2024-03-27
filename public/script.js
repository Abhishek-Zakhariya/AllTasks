let form = document.getElementById('form');
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');
let dob = document.getElementById('dob');
let pass = document.getElementById('pass');
let cpass = document.getElementById('cpass');
let addr = document.getElementById('addr');
let submit = document.getElementById('submit');
pass1 = 0;
pass1 += 1;
pass.value = '123' + pass1;
cpass.value = pass.value;
addr.value = 'jamnagar'

submit.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        submit.click();
    }
})

async function validateForm() {
    function errMsg(control, msg, color) {
        // let err = document.createElement('p');
        // err.innerHTML = msg;
        // err.style.color = 'red';
        control.style.color = 'red';
        control.placeholder = msg;

    }

    let returnVal = true;
    if (fname.value == '') {
        errMsg(fname, "Required*")
        returnVal = false;
    }
    if (lname.value == '') {
        errMsg(lname, "Required*")
        returnVal = false;
    }
    if (email.value == '') {
        errMsg(email, "Required*")
        returnVal = false;
    }
    if (dob.value == '') {
        errMsg(dob, "Required*")
        returnVal = false;
    }
    if (pass.value == '') {
        errMsg(pass, "Required*")
        returnVal = false;
    }
    if (addr.value == '') {
        errMsg(addr, "Required*")
        returnVal = false;
    }
    if (cpass.value == '') {
        errMsg(cpass, "Required*")
        returnVal = false;
    }

    if (pass.value != cpass.value) {
        errMsg(cpass, "Password Doesn't Matched!")
        returnVal = false;
    }

    return returnVal;
}

async function getFormData() {
    let validateForm1 = await validateForm();

    if (validateForm1 == true) {

        let detail = new FormData(form)
        let params = new URLSearchParams(detail);

        // Data Mokli rahiya chhiye client side thi backend ma

        let data = await fetch('http://localhost:7700/insert', {
            method: 'post',
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        let data1 = await data.json();

        // backend mathi delink,key mangavi je data1 ma aavi
        if (data1.delLink == 'false') {
            disableLink();
        }

        if (data1.allow == false) {
            let err = document.getElementById('err');
            err.style.color = 'red';
            err.innerHTML = 'Email Already Exists!';
        }
        else {
            key = `http://localhost:9600/welcome/${data1.key}`;
            err.style.display = 'none';
            let link = document.getElementById('link');
            link.innerHTML = `<label style='color:red;'>Activation Link: <label><a href="${key}">${key}
                    </a>`;
        }
    }
}

async function clearFormData() {
    fname.value = '';
    lname.value = '';
    email.value = '';
    dob.value = '';
    pass.value = '';
    cpass.value = '';
    addr.value = '';
}

async function disableLink() {
    link.style.display = 'none';
    form.reset();
}

// ForgotPassword JS File
