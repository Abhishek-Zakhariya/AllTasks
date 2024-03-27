let row = document.querySelector(".row_1");

function ScrollForward() {
    row.scrollBy({
        left: 200,
        behavior: "smooth"
    });
}

function ScrollReverse() {
    row.scrollBy({
        left: -200,
        behavior: "smooth"
    });
}

let language = document.querySelector(".icons");
let old = document.querySelector(".tag-1");
let tag = document.querySelector("#span");

console.log(old.innerHTML);
language.addEventListener("click",function display() {
    tag.innerHTML = old.innerHTML;
});

