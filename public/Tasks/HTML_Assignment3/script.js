let card = document.getElementsByClassName("col2");
let txt_h3 = document.getElementsByClassName("txt h3");
let txt_h4 = document.getElementsByClassName("txt h4");
let txt_p= document.getElementsByClassName("txt4 p");
// let txt = document.querySelectorAll(".txt4 h3");
// let txt1 = document.querySelector(".txt4 h4");


for (let index = 0; index < card.length; index++) {

    let btn = document.getElementsByClassName("card[index] btn5");
    card[index].addEventListener("mouseover", function () {
        card[index].style.backgroundColor = "black";
        card[index].style.color = "white";
        card[index].style.marginTop = "-20px";
        // txt_h4.style.color = "white";
        // txt_p.style.color = "white";
        // btn.style.color = "#FC7F3A"
    });

    card[index].addEventListener("mouseout", function () {
        card[index].style.backgroundColor = "";
        card[index].style.color = "";
        card[index].style.marginTop = ""; 


        // txt_h3.style.color = "";
        // txt_h4.style.color = "";
        // txt_p.style.color = "";
        // btn.style.color = ""
    });
}

