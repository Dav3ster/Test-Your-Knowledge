// variables to keep track of quiz state
var currentQuestionIndex = 0;
var timeLeft = 75;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var choice1 = document.getElementById('choice1')
var choice2 = document.getElementById('choice2')
var choice3 = document.getElementById("choice3")
var choice4 = document.getElementById("choice4")
choice1.addEventListener("click", getQuestion2)
choice2.addEventListener("click", getQuestion2)
choice3.addEventListener("click", getQuestion2)
choice4.addEventListener("click", getQuestion2)

function startQuiz() {
    // hide start screen
    var hide = document.getElementById("start-screen");
    document.querySelector(".start").addEventListener("click", function(){
        hide.style.display = "none"
    })
    
    // un-hide questions section
    var showQ = document.getElementById("questions");
    document.querySelector(".start").addEventListener("click", function(){
        showQ.style.display = "block"
    })

    getQuestion()

    //start timer
    //You will also need to use setInterval and clockTick
    timerId = setInterval(countdown, 1000);
    var elem = document.getElementById("time")
    function countdown() {
      if (timeLeft == 0) {
        clearTimeout(timerId);
        quizEnd();
      } else {
        elem.innerHTML = timeLeft;
        timeLeft--;
      }
    }
}
    //getQuestion();

function getQuestion() { //this function is going to get the data from the questions array
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex]

    // update title with current question
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choices
   choice1.textContent = currentQuestion.choices[0]
   choice2.textContent = currentQuestion.choices[1]
   choice3.textContent = currentQuestion.choices[2]
   choice4.textContent = currentQuestion.choices[3]
}

function getQuestion2(event) { //this function is going to get the data from the questions array
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex]

    var userChoice = event.target.textContent
    if (userChoice !== currentQuestion.answer) {
        timeLeft -= 10;
    }
    currentQuestionIndex++

    if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
    
}


function quizEnd() {
    // stop timer
    clearInterval(timerId);
    var showQ = document.getElementById("questions");
    showQ.style.display = "none"
    timerEl.style.display = "none"
    // show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    // show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = timeLeft;
}

// creat a global array
var highscores = JSON.parse(localStorage.getItem("highscores")) || []

highscores = JSON.parse(localStorage.getItem("highscores"))
// if the local storage doesnt exist set the array = to a empty []
if (localStorage == "") {
    highscores = []
} 

function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();

    // make sure value wasn't empty
    if (initials !== '') {
        
       var highScorcesData = {
            name: initialsEl.value,
            highscores: timeLeft
       }

       highscores.push(highScorcesData)
       localStorage.setItem("highscores", JSON.stringify(highscores))
       window.location.href = 'highscores.html';
    }
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === 'Enter') {
        saveHighscore();
    }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;