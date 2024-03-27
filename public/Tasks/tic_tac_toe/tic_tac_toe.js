let boxes = document.querySelectorAll(".btn");
let count = 0;
let winPattern = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]];
let player1 = true;
let player2 = false;

boxes.forEach(box => {
    box.addEventListener("click", function () {
        if (player1) {
            box.innerHTML = "O";
            player1 = false;
        }
        else {
            box.innerHTML = "X";
            player1 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count == 9 && !isWinner) {
            msg.innerText = "Match Draw!"
        }
    })
});

function showWinner(winner) {
    boxes.forEach(box => {
        box.disabled = true;
    });
    if (winner == 'O') {
        msg.innerText += "Player-1!";
    }
    else {
        msg.innerText += "Player-2!";
    }
}

function checkWinner() {
    winPattern.forEach(pattern => {
        let pos1 = boxes[pattern[0]].innerHTML;
        let pos2 = boxes[pattern[1]].innerHTML;
        let pos3 = boxes[pattern[2]].innerHTML;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                showWinner(pos1);
                return true;
            }
        }
    });
}

function reset() {
    boxes.forEach(box => {
        location.reload();
    });
}








