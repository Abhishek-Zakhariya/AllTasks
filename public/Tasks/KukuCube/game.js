var mytbl = document.getElementById("tbl");
var time = 0;
var counter = 0;
var start = document.getElementById("start");

var second = 10;
start.addEventListener('click', function () {
    let timer = setInterval(function () {
        document.getElementById("time").innerHTML = second;
        second--;
        if (second <= 0) {
            document.getElementById("time").style.color = "red";
            document.getElementById("time").innerHTML = "Time Out";
            clearInterval(timer);
            alert("Time Out");
        }
    }, 1000);
});



// function number(min,max)
// {
//     //return Math.floor(Math.random() *);
//    // return Math.floor(Math.random() * (max-min+1))+ min;

// }

function randcolor() {
    var roundValue = Math.round, rndmValue = Math.random, maxNum = 255;
    return 'rgba(' + roundValue(rndmValue() * maxNum) + ',' + roundValue(rndmValue() * maxNum) + ',' + roundValue(rndmValue() * maxNum) + ')';
}


function combine() {

    counter += 1;
    let color = randcolor();
    fun_addrow();
    fun_addcol();

    //document.getElementById("td1").removeAttribute("onclick")
    //document.getElementById("td1").removeAttribute("id");

    var collen = mytbl.rows[0].cells.length;
    var rowlen = mytbl.rows.length;

    let rnd1 = Math.floor(Math.random() * mytbl.rows.length);
    let rnd2 = Math.floor(Math.random() * mytbl.rows[0].cells.length);

    for (let i = 0; i < rowlen; i++) {
        for (let j = 0; j < collen; j++) {
            if (i == rnd1 && j == rnd2) {
                mytbl.rows[i].cells[j].style.background = color.replace(")", ",0.6)");
            } else {
                mytbl.rows[i].cells[j].style.background = color;
            }
            mytbl.rows[i].cells[j].id = "cell_" + i + "_" + j;
        }
        document.getElementById("score").innerHTML = counter;
    }

    console.log(rnd1, rnd2);
    let rnd = document.getElementById("tbd").children[rnd1].children[rnd2];
    rnd.setAttribute("id", "td1");
    rnd.setAttribute("onclick", "combine()");
    console.log(rnd);
}

function fun_addrow() {
    const tr = document.createElement("tr");
    const cols = tbl.rows[0].cells.length;

    for (let i = 0; i < cols; i++) {
        const td = document.createElement("td");
        td.setAttribute("onclick", "combine()");
        tr.appendChild(td);
    }
    mytbl.appendChild(tr);
    // var rw = tbl.rows;
    // var cols = tbl.rows[0].cells.length;

    // var row = tbl.insertRow(rw.length);
    // console.log(row);
    // var cell;

    // for (let i = 0; i < cols; i++) {
    //     cell = row.insertCell(i);
    //     cell.setAttribute("onclick",fun1());
    // }
}



function fun_addcol() {
    var tr = document.querySelectorAll("#tbl tr");
    for (let rw of tr) {
        var td = document.createElement("td");
        td.setAttribute("onclick", "combine()");
        rw.appendChild(td);
    }
}




