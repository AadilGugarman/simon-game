let language = prompt("Choose language (en for English, hi for Hindi):");

let rules = {
  en:
    "Simon Game Rules:\n\n" +
    "1. Objective: Match the sequence of colors shown by the game.\n" +
    "2. Levels: Start at Level 1. Each correct round increases the level and lengthens the sequence.\n" +
    "3. Gameplay: The game shows a random sequence (purple, orange, blue, pink). Repeat it by clicking the boxes. A new color is added after each round.\n" +
    "4. Controls: Use 'Reset Game' to start over, and toggle 'Dark/Light Mode' for visibility.\n" +
    "5. Winning & Losing: Win by following the sequence. Lose by clicking the wrong box—game resets to Level 1.\n" +
    "6. Timing: No strict time limit, practice to improve speed.\n\n" +
    "Click 'OK' to start the game!",
  hi:
    "Simon Game Rules:\n\n" +
    "1. Objective: Jo colors game dikhaaye, unka sequence match karna hai.\n" +
    "2. Levels: Level 1 se shuru hota hai. Har sahi round mein level badhta hai aur sequence lamba hota hai.\n" +
    "3. Gameplay: Game random colors ka sequence dikhaata hai (purple, orange, blue, pink). Boxes pe click karke wahi repeat karo. Har round ke baad ek naya color add hota hai.\n" +
    "4. Controls: 'Reset Game' se naye se shuru karo, aur 'Dark/Light Mode' se visibility change karo.\n" +
    "5. Winning & Losing: Sequence follow karke jeeto. Galat box pe click karoge to haar—game Level 1 se restart ho jaayega.\n" +
    "6. Timing: Koi time limit nahi hai, practice se speed badhaao.\n\n" +
    "'OK' pe click karke game shuru karo!",
};

window.addEventListener("load", () => {
  let messege = rules[language] || rules.en;
  alert(messege);
});

let userSeq = [];
let compSeq = [];

let gameStarted = false;
let level = 0;
let gameUpdate = document.querySelector(".gameUpdate");
let resetBtn = document.querySelector(".resetBtn");
let toggleBtn = document.querySelector(".toggleBtn");
let body = document.querySelector("body");

let colorBox = ["purple", "orange", "pink", "teal"];

["touchend", "keypress"].forEach((event) => {
  document.addEventListener(event, () => {
    if (gameStarted == false) {
      gameStarted = true;
      levelUp();
    }
  });
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
  checkAns(userSeq.length - 1);
};

const flash = (color) => {
  color.classList.add("flash");
  setTimeout(() => {
    color.classList.remove("flash");
  }, 700);
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
