"use strict";

const boxes = document.querySelectorAll(".box");
const statusBar = document.querySelector(".status");
const restartBtn = document.querySelector("#restart");

let x = '<img src="./image/x-png.png">';
let o = '<img src="./image/o---png.png">';
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;
init();
function init() {
  boxes.forEach((box) => box.addEventListener("click", boxClick));
  statusBar.innerHTML = `${player} Your Turn....`;
  restartBtn.addEventListener("click", resetGame);
  running = true;
}
function boxClick() {
  const index = this.dataset.index;
  if (options[index] !== "" || !running) {
    return;
  }
  updateBox(this, index);
  checkWinner();
}
function updateBox(box, index) {
  options[index] = player;
  box.innerHTML = currentPlayer;
}
function checkWinner() {
  let isWon = false;
  for (let i = 0; i < win.length; i++) {
    const condition = win[i];
    //console.log(condition);
    const box1 = options[condition[0]];
    const box2 = options[condition[1]];
    const box3 = options[condition[2]];
    //console.log(box1,box2,box3);

    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }
    if (box1 == box2 && box2 == box3) {
      isWon = true;
      boxes[condition[0]].classList.add("win");
      boxes[condition[1]].classList.add("win");
      boxes[condition[2]].classList.add("win");
    }
  }
  if (isWon) {
    statusBar.textContent = `${player} Won The Game....`;
    running = false;
  } else if (!options.includes("")) {
    statusBar.innerHTML = `Game Draw....`;
    running = false;
  }else{
    changePlayer();
  }
}
function changePlayer() {
    player=(player=="X") ? "O" : "X" ;
    statusBar.innerHTML = `${player} Your Turn....`;
    currentPlayer=(currentPlayer== x) ? o : x ;
}

function resetGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = x;
  player = "X";
  running = true;
  statusBar.innerHTML = `${player} Your Turn....`;
  boxes.forEach(box=>{
    box.innerHTML="";
    box.classList.remove("win");
  })
}
