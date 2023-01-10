const apiUrl = 'https://the-trivia-api.com/api/questions?limit=1';
let rightAnswer;
let points = 0;

async function start() {
  let startScreen = document.getElementById('start');
  startScreen.style = 'display: none';
  let response = await fetch(apiUrl);
  let data = await response.json();

  let question = data[0].question;
  let correctAnswer = data[0].correctAnswer;
  let incorrectAnswers = data[0].incorrectAnswers;
  function getRandom() {
    return Math.floor(Math.random() * (4 - 1) + 1);
  }

  let questionDisplay = document.getElementById('question');
  questionDisplay.innerText = question;
  rightAnswer = correctAnswer;

  /* BUTTONS */
  let answer1 = document.getElementById('first');
  let answer2 = document.getElementById('second');
  let answer3 = document.getElementById('third');
  let answer4 = document.getElementById('fourth');

  let gotNumber = getRandom();
  let answers = [answer1, answer2, answer3, answer4];
  let generatedAnswers = [];

  if (gotNumber == 1) {
    generatedAnswers = [
      correctAnswer,
      incorrectAnswers[0],
      incorrectAnswers[1],
      incorrectAnswers[2],
    ];
  } else if (gotNumber == 2) {
    generatedAnswers = [
      incorrectAnswers[0],
      correctAnswer,
      incorrectAnswers[1],
      incorrectAnswers[2],
    ];
  } else if (gotNumber == 3) {
    generatedAnswers = [
      incorrectAnswers[0],
      incorrectAnswers[1],
      correctAnswer,
      incorrectAnswers[2],
    ];
  } else {
    generatedAnswers = [
      incorrectAnswers[0],
      incorrectAnswers[1],
      incorrectAnswers[2],
      correctAnswer,
    ];
  }

  for (i = 0; i < 4; i++) {
    answers[i].innerText = generatedAnswers[i];
  }
  console.log(correctAnswer);
}

let btns = document.getElementsByClassName('buttons');
let clicked = false;

function btnsPressed(e) {
  let answerPressed = e.target.innerText;

  let bugAnswers = ["first", "second", "third", "fourth"];
  if (!bugAnswers.includes(e.target.id)) return

  if (clicked === true) return;

  if (answerPressed == rightAnswer) {
    continueGame(e);
    clicked = true;
  } else {
    clicked = true;
    endGame(e);
  }
}

for (let btn of btns) {
  btn.addEventListener('click', btnsPressed);
}

function continueGame(e) {
  let el = document.getElementById(e.target.id).parentElement;
  el.style = 'background: green';
  setTimeout(() => {
    el.style = 'background: transperent';
    clicked = false;
    addPoints();
    start();
  }, 1000);
}

function addPoints() {
  if (points <= 15) {
    points++;
  } else {
    document.getElementById('won').style.display = 'flex';
  }

  let money = document.getElementById(`w${points}`);

  money.style = 'color: green';
}

function endGame(e) {
  let el = document.getElementById(e.target.id).parentElement;
  el.style = 'background: red';
  setTimeout(() => {
    location.reload();
  }, 3000);
}
