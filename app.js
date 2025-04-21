let userSeq = [];
let compSeq = [];

let gameStarted = false;
let level = 0;
let gameUpdate = document.querySelector(".gameUpdate");
let resetBtn = document.querySelector(".resetBtn");
let toggleBtn = document.querySelector(".toggleBtn");
let body = document.querySelector("body");

let colorBox = ["purple", "orange", "pink", "teal"];

document.addEventListener("keypress", () => {
  if (gameStarted == false) {
    gameStarted = true;
    levelUp();
  }
});
resetBtn.addEventListener("click", () => {
  if (gameStarted == false) {
    gameStarted == true;
    levelUp();
    resetBtn.disabled = true;
  }
});

const levelUp = () => {
  level++;
  gameUpdate.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  console.log(randIdx);
  let randBox = colorBox[randIdx];
  let randColor = document.querySelector(`.${randBox}`);
  compSeq.push(randBox);
  flash(randColor);
};

const checkAns = (idx) => {
  if (userSeq[idx] === compSeq[idx]) {
    if (userSeq.length == compSeq.length) {
      setTimeout(levelUp, 700);
      userSeq = [];
    }
  } else {
    gameUpdate.innerHTML = `Game Over! Your Score Was <b>${level}<b> <br> Press Any Key To Start `;
    resetGame();
    body.style.backgroundColor = "red";
    setTimeout(() => {
      body.style.backgroundColor = "";
    }, 800);
  }
};

const userGame = (event) => {
  let userColor = event.target;
  flash(userColor);
  userSeq.push(userColor.getAttribute("id"));
  console.log(userSeq);
  checkAns(userSeq.length - 1);
};

const flash = (color) => {
  color.classList.add("flash");
  setTimeout(() => {
    color.classList.remove("flash");
  }, 500);
};

let boxes = document.querySelectorAll(".box");
for (let box of boxes) {
  box.addEventListener("click", userGame);
}

const resetGame = () => {
  level = 0;
  gameStarted = false;
  userSeq = [];
  compSeq = [];
  resetBtn.disabled = false;
};
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("toggle");
});
