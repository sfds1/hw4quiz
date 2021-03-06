
// returns the elements that match the ID listed in quotes
// have to be careful if use the ID in multiple places but IDs should be used once
const startBtn = document.getElementById("startQuiz");
const timer = document.getElementById("timer");
const quiz = document.getElementById('quiz');
const message = document.getElementById('message');
const name = document.getElementById('name');

// pulls highscores from local storage. 
// local storage stores items as a string
// if want to store array, then need to use JSON.stringify to make a string
// to convert to an array, then need to use JSON.parse
// create variable to store the high scores
var scores = []
var scores = JSON.parse(localStorage.getItem("highScore"));

// If an array does not exist, then create a blank one.
if (!scores) {
  scores = []
}


let secondsLeft = 30;
let currentQuestion = 0;
let score = 0;


// questions for quiz
const questions = [
  {
    subject: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "How To Manipulate Language", "Hello To My Lady"],
    answer: "Hyper Text Markup Language"
  },
  {
    subject: "What does CSS stand for?",
    choices: ["Cascading Style Sets", "Cascading Style Sheets", "Coding Source Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    subject: "What does JS stand for?",
    choices: ["JavaSit", "JavaSplit", "JavaScript"],
    answer: "JavaScript"
  }
];

// when the start button is clicked, the startQuiz function is called
startBtn.addEventListener("click", startQuiz);


// Starts the quiz
function startQuiz() {
  timerCountdown();
  quiz.innerText = 'Ready?'
  // waits 1 second to display the question so the question and timer show at the same time
  setTimeout(() => {
    renderQuestion();
  }, 1000);
};

// Starts timer
// when the timer hits zero then clear the timer and end the game
function timerCountdown() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.innerHTML = `
		<div>Time Remaining: ${secondsLeft} seconds
		<br>
    </div>
		`;
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      return endGame();
    }
  }, 1000);
};


// Generates questions and answer option buttons
function renderQuestion() {
  let questList = questions[currentQuestion].choices.map((question) => {
    return `<button class="answerBtn" onclick="checkAnswer('${question}')">${question}</button>`;
  });
  quiz.innerHTML = `${questions[currentQuestion].subject}<br>${questList.join("")}`;
};

// Adds to score if answered correctly
// Subtracts time if answered correctly
// Shows message about answer
// When all questions are answered, then quiz ends
function checkAnswer(selection) {
  if (questions[currentQuestion].answer === selection) {
    message.innerHTML = '<p> Correct</p>';
    score++;
  } else {
    message.innerHTML = '<p> Wrong</p>';
    secondsLeft -= 10;
  }
  currentQuestion++;
  if (currentQuestion === questions.length) {
    return endGame();
  }
  renderQuestion();
};


// Displays your final score and allows a Save Score input area
// Retry button also appears

function endGame() {

  quiz.innerHTML = '<p> End</p>';

  message.innerHTML = `
	 	<p>You got ${score} of ${questions.length} correct.</p>
     <br><br>
     <form onsubmit="saveScore(event)">
      <input type="text" id = "name" placeholder="Enter Name"></input>
      <input type="submit" value="Save"></input>
		</form>
  `;


  secondsLeft = 0;
  timer.innerHTML = `
  <button id="retry" onclick="playAgain()">Play Again?</button>
  `;
};

function saveScore() {
  event.preventDefault()

  var inputName = document.getElementById("name").value;
  scores.push([inputName, score]);
  // console.log("score on save: ", scores)
  localStorage.setItem("highScore", JSON.stringify(scores));

  renderScores();
};

function renderScores() {
  // console.log("renderscore");
  scoresSTR = localStorage.getItem("highScore");
  scores = JSON.parse(scoresSTR)
  console.log("scores:", scores, scores.length)
  for (i = 0; i < scores.length; i++) {
    // console.log("i:", i)
    var list = `<li>${scores[i][0]}, ${scores[i][1]}</li>`
    // console.log(list);
    $("#list").append(list);


  }

};


// Function to run the Play Again button, this restarts the quiz
function playAgain() {
	secondsLeft = 30;
	currentQuestion = 0;
  score = 0;
  message.innerHTML = ``;
  // makes the list empty so it can be displayed again from the start when the next game is over
  $("#list").empty();
	startQuiz();
};



/* Pseudo Code
 on page load:
  show game start screen
  include how to play instructions
  add start quiz button

  on start button click:
    hide game-start div
    show questions div
    show question
    start timer

  on answer selection:
    check to see if answer is correct
    if correct:
      display success message
      add to score
      show next question
    if incorrect:
      display fail message
      deduct time from timer
      show next question

  for game end:
    if all the questions have been answered:
      display score
      prompt to save initials and results
      on save:
        record results in local storage
    if time runs out:
      display score
      prompt to try again
*/

/*
  functions:
    startGame()
    resetGame()
    endGame()
    restartGame()

    startTimer()
    decrementTimer()

    renderQuestion()
    checkAnswer()

    saveScore()
    clearScores()
    toggleScores()

*/