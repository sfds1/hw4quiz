
// returns the first element within the document that matches
const startBtn = document.querySelector("#startQuiz");

const timer = document.querySelector("#timer");


let secondsLeft = 30;

// when the start button is clicked, the startQuiz function is called
startBtn.addEventListener("click", startQuiz);


// Starts the quiz
function startQuiz() {
	// displayQuestion();
	setTime();
};

// Starts timer
function setTime() {
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