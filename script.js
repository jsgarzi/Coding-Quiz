var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question:
            "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        question:
            "Full-stack development languages include all of the following BUT:",
        choices: ["javascript", "JQuery", "CSS", "HTML"],
        answer: "JQuery",
    },
    {
        question:
            "This language is used to generate a random number through javascript",
        choices: ["Math.floor()", "Math.random()", "Math.abs()", "Math.ceil()"],
        answer: "Math.random()",
    },
    {
        question:
            "Javascript is referenced in this type of tag:",
        choices: ["<div>", "<style>", "<meta>", "<script>"],
        answer: "<script>",
    }
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var startEl = $("#gameStart");

var questionIndex = 0;
var correctCount = 0;
var time = 20;
var intervalId;
var start = false;
var ended = false;

$("#gameStart").on("click", function () {
    if (start === false) {
        start = true;
        renderQuestion();
        $("#gameStart").text("End Game");
        $('#description').addClass('hidden')
    }
    else if (start === true) {
        endQuiz();
    }
});



function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}

function renderQuestion() {

    if (time == 0) {
        updateTime();
        return;
    }

    intervalId = setInterval(updateTime, 1000);
    questionEl.textContent = questions[questionIndex].question;

    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;

    for (var i = 0; i < choicesLenth; i++) {
        var questionListItem = document.createElement("button");
        questionListItem.textContent = choices[i];
        questionListItem.setAttribute("class", "btn btn-dark m-2")
        optionListEl.append(questionListItem);
    }
}

function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
        time = 0;
    }
    renderQuestion();
}

function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("button")) {
        var answer = event.target.textContent;
        if (answer === questions[questionIndex].answer) {
            questionResultEl.textContent = "Correct";
            correctCount++;
        } else {
            questionResultEl.textContent = "Incorrect";
            time = time - 2;
            timerEl.textContent = time;
        }
    }
    setTimeout(nextQuestion, 2000);
}

function endQuiz() {
    if (ended === false) {
        ended = true
        clearInterval(intervalId);
        $('.quiz').css('display', 'none')
        $('#title-text').text("Game over, You scored " + correctCount)
        setTimeout(showHighScore, 2000);
    }
}

function showHighScore() {
    var nameInput = false;
    while (nameInput === false) {
        var name = prompt("Please enter your name");
        if (name != "" && name != null) {
            nameInput = true;
        }
    }
    var high_scores = localStorage.getItem("scores");

    if (!high_scores) {
        high_scores = [];
    } else {
        high_scores = JSON.parse(high_scores);
    }

    high_scores.push({ name: name, score: correctCount });

    localStorage.setItem("scores", JSON.stringify(high_scores));

    high_scores.sort(function (a, b) {
        return b.score - a.score;
    });

    var contentUL = document.createElement("div");

    for (var i = 0; i < high_scores.length; i++) {
        var contentLI = document.createElement("p");
        contentLI.textContent =
            "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
        contentUL.appendChild(contentLI);
    }

    $('#title-text').text("Highscores")

    $('#scores').append(contentUL);

    $("#home").removeClass("hidden");
    $("#clear").removeClass("hidden");
    $('#highscoreLink').addClass('hidden')


}

$("#clear").on("click", function () {
    var clear = confirm("You want to clear the high scores?")
    if (clear) {
        $('#scores').empty();
        localStorage.clear()
    }
});

$("#home").on("click", function () {
    location.reload(true);
});

optionListEl.addEventListener("click", checkAnswer);

$('#highscoreLink').on('click', showScores)

function showScores() {
    $('.quiz').css('display', 'none')

    var high_scores = localStorage.getItem("scores");

    if (!high_scores) {
        high_scores = [];
    } else {
        high_scores = JSON.parse(high_scores);
    }

    var contentUL = document.createElement("div");

    for (var i = 0; i < high_scores.length; i++) {
        var contentLI = document.createElement("p");
        contentLI.textContent =
            "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
        contentUL.appendChild(contentLI);
    }

    $('#title-text').text("Highscores")
    $('#scores').append(contentUL);
    $("#home").removeClass("hidden");
    $("#clear").removeClass("hidden");
    $('#highscoreLink').addClass('hidden')
}