
// returns the elements that match the ID listed in quotes
// have to be careful if use the ID in multiple places but IDs should be used once
const startBtn = document.getElementById("startQuiz");
const timer = document.getElementById("timer");
const quiz = document.getElementById('quiz');

let secondsLeft = 30;
let currentQuestion = 0;

// questions for quiz
const questions = [
  {
      subject : "What does HTML stand for?",
      choices : ["Hyper Text Markup Language", "How To Manipulate Language", "Hello To My Lady"],
      answer : "Hyper Text Markup Language"
  },
  {
      subject : "What does CSS stand for?",
      choices : ["Cascading Style Sets", "Cascading Style Sheets", "Coding Source Sheets"],
      answer : "Cascading Style Sheets"
  },
  {
      subject : "What does JS stand for?",
      choices : ["JavaSit", "JavaSplit", "JavaScript"],
      answer : "JavaScript"
  }
];

// when the start button is clicked, the startQuiz function is called
startBtn.addEventListener("click", startQuiz);


// Starts the quiz
function startQuiz() {
  timerCountdown();
  displayQuestion();
};

// Starts timer
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
			// return endGame();
		}
	}, 1000);
};

// Generates questions and answer option buttons
function displayQuestion() {
	let questList = questions[currentQuestion].choices.map((question) => {
		return `<button class="answerBtn" onclick="answerQuestion('${question}')">${question}</button>`;
	});
	quiz.innerHTML = `${questions[currentQuestion].subject}<br>${questList.join("")}`;
};



/*
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