document.addEventListener('DOMContentLoaded', function () {
    // Retrieve scores from local storage or initialize an empty array
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // this contains the questions and answers
    const questions = [
        {
            question: "Commonly used data types DO not include:",
            options: ["string", "booleans", "alerts", "number"],
            answer: 2
        },

        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is:",
            options: ["Javascript", "terminal/bash", "for loops", "console.log"],
            answer: 3
        },

        {
            question: "Javascript is an _______ language?",
            options: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
            answer: 1
        },

        {
            question: "Which of the following keywords is used to define a variable in Javascript?",
            options: ["var", "let", "var and let", "function"],
            answer: 3
        },

        {
            question: "Which one of the following also known as Conditional Expression:",
            options: ["Alternative to if-else", "Switch statement", "If-then-else statement", "immediate if"],
            answer: 4
        },

        {
            question: "In JavaScript, what is a block of statement?",
            options: ["Conditional block", "block that combines a number of statements into a single compound statement", "both conditional block and a single statement", "block that contains a single statement"],
            answer: 2
        },

        {
            question: "The function and var are known as:",
            options: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
            answer: 3
        },

        {
            question: "Which of the following variables takes precedence over the others if the names are the same?",
            options: ["Global variable", "The local element", "The two of the above", "None of the above"],
            answer: 2
        },

        {
            question: "In the JavaScript, which one of the following is not considered as an error:",
            options: ["Syntax error", "Missing of semicolons", "Division by zero", "Missing of Bracket"],
            answer: 3
        },

        {
            question: "In JavaScript the x===y statement implies that:",
            options: ["Both are equal in the value and data type.", "Both are x and y are equal in value only.", "Both are not same at all.", "Both x and y are equal in value, type and reference address as well."],
            answer: 1
        },
    ];

    // a list of global varibles the code calls to so the page functions as intended
    var startPage = document.querySelector('.start-page');
    var questionScreen = document.getElementById('question-screen');
    var quizSubmit = document.getElementById('quiz-submit');
    var highScore = document.getElementById('highscore');
    var scoreButton = document.getElementById('highscore-page');
    var startButton = document.getElementById('start');
    var submitButton = document.getElementById('submit');
    var backButton = document.getElementById('Go-Back');
    var timerElement = document.getElementById('timer');
    var questionElement = document.getElementById('question');
    var answerButtons = document.querySelectorAll('.btn');
    var timer;
    var currentQuestionIndex = 0;
    var score = 0; // starts the score
    var timeLimit = 75; // how many seconds you start with

    // when pressing enter on the keyboard it allows for the submit button to be pressed
    var initialsInput = document.querySelector('input[type="text"]');
    var playerInitials = initialsInput.value.trim(); // Get player's initials

    initialsInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            // Trigger a click on the Submit button
            submitButton.click();
        }
    });

    // this allows for visibility of the questions after pressing start
    startButton.addEventListener('click', function () {
        console.log('Start button clicked');
        resetQuiz(); 
        startPage.classList.add('hide');
        questionScreen.classList.remove('hide');
        startTimer();
        showQuestion(); // Show the first question after pressing Start
    });

    //this is function is bad so that the timer and pervious score don't carry over when you retry the quiz
    function resetQuiz() {
        clearInterval(timer);
        timeLimit = 75; // Reset the timer
        currentQuestionIndex = 0;
        score = 0; // Reset the score
        updateTimerDisplay(timeLimit);
        answerButtons.forEach(function (button) {
            button.removeEventListener('click', handleAnswer);
        });
    }
    
    // allows for the timer to count down and when it hits 0 it makes the submit section visible
    function startTimer() {
        timer = setInterval(function () {
            if (timeLimit > 0) {
                timeLimit--;
                updateTimerDisplay(timeLimit);
            } else {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }
    
    

    function updateTimerDisplay(timeRemaining) {
        timerElement.textContent = 'Time: ' + timeRemaining + 's';
    }

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            var currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;

            answerButtons.forEach(function (button, index) {
                button.textContent = currentQuestion.options[index];

                button.addEventListener('click', handleAnswer);
            });
        } else {
            endQuiz();
        }
    }

    function handleAnswer(event) {
        var index = Array.from(answerButtons).indexOf(event.target);
        var currentQuestion = questions[currentQuestionIndex];
        var answerStatus = document.createElement('p');
    
        // Check if the selected answer is correct
        if (index + 1 === currentQuestion.answer) {
            console.log('Correct!');
            score += 10;
            answerStatus.textContent = 'Correct!';
            answerStatus.className = 'correct'; // Assign the 'correct' class
        } else {
            console.log('Incorrect!');
            if (timeLimit > 10) {
                timeLimit -= 10;
            } else {
                timeLimit = 0;
            }
            updateTimerDisplay(timeLimit);
            answerStatus.textContent = 'Incorrect!';
            answerStatus.className = 'incorrect'; 
        }
    
        questionScreen.appendChild(answerStatus);
    
        setTimeout(function () {
            answerStatus.remove();
            currentQuestionIndex++;
            showQuestion();
        }, 500);
    }
    
    
    
    // shows the submission page after the quiz is over
    function endQuiz() {
        clearInterval(timer); // Clear the timer interval
        questionScreen.classList.add('hide');
        quizSubmit.classList.remove('hide');
    
        // Display the score on the submission form
        var scoreDisplay = document.getElementById('quiz-submit-score');
        scoreDisplay.textContent = 'Score: ' + score; // Update the score display

    }

    // makes the scoreboard visible after hitting submit
    submitButton.addEventListener('click', function () {
        console.log('submit button clicked');
        quizSubmit.classList.add('hide');
        highScore.classList.remove('hide');

        // Get player's initials from the input field
        var playerInitials = initialsInput.value.trim();

        // Add the current player's score to the scores array
        scores.push({ initials: playerInitials, score: score });

        // Update the score display
        updateScoreDisplay();

        // Save scores to local storage
        localStorage.setItem('scores', JSON.stringify(scores));
    });

    // lets you go back to the start of the page
    backButton.addEventListener('click', function () {
        console.log('Go Back button clicked');
        highScore.classList.add('hide');
        startPage.classList.remove('hide');
    });

    // This allows for the scoreboard to be accessed from anywhere
    scoreButton.addEventListener('click', function () {
        console.log('highscore button clicked');
        highScore.classList.remove('hide');
        startPage.classList.add('hide');
        quizSubmit.classList.add('hide');
        questionScreen.classList.add('hide');
        updateScoreDisplay();
    });

    // Updates the score display in the highscore section
    function updateScoreDisplay() {
        var scoreList = document.getElementById('score');
        scoreList.innerHTML = ''; // Clear previous scores
    
        // Sort the scores from high to low
        scores.sort((a, b) => b.score - a.score);
    
        for (var i = 0; i < scores.length; i++) {
            var scoreItem = document.createElement('li');
            scoreItem.textContent = scores[i].initials + ' - ' + scores[i].score;
            scoreList.appendChild(scoreItem);
        }
    }


var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function () {
    // Clear the scores array
    scores.length = 0;

    // Update the score display
    updateScoreDisplay();

    // Save the changes to local storage
    localStorage.setItem('scores', JSON.stringify(scores));
});


});
