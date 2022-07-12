// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question: "Is JavaScript a case-sensitive language?",
        imgSrc: "img/html.png",
        choiceA: "A)True ",
        choiceB: "B)False",
        choiceC: "C)Depends",
        choiceD: "D)None",
        correct: "A"

    }, {
        question: "How can you get the type of arguments passed to a function?",
        imgSrc: "img/css.png",
        choiceA: "A)using getType function",
        choiceB: "B)using typeof operator",
        choiceC: "C)Both of the above.",
        choiceD: "D)None of the above",
        correct: "B"
    }, {
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        imgSrc: "img/css.png",
        choiceA: "A)push()",
        choiceB: "B)put()",
        choiceC: "C)last()",
        choiceD: "D)None of the above.",
        correct: "A"
    }, {
        question: "Which of the following code creates an object?",
        imgSrc: "img/css.png",
        choiceA: "A)var book = new Book();",
        choiceB: "B)var book = new OBJECT();",
        choiceC: "C)var book = new Object()",
        choiceD: "D)var book = Object();",
        correct: "C"
    }, {
        question: "Which of the following function of String object combines the text of two strings and returns a new string?",
        imgSrc: "img/css.png",
        choiceA: "A)append()",
        choiceB: "B)add()",
        choiceC: "C)merge()",
        choiceD: "D)concat()",
        correct: "D"
    }, {
        question: "Which of the following function of String object returns the characters in a string beginning at the specified location through the specified number of characters?",
        imgSrc: "img/css.png",
        choiceA: "A)substr()",
        choiceB: "B)split()",
        choiceC: "C)search()",
        choiceD: "D) substr()",
        correct: "A"
    }, {
        question: "Which of the following function of String object causes a string to be displayed in the specified size as if it were in a <font size = 'size'> tag?",
        imgSrc: "img/css.png",
        choiceA: "A)fixed()",
        choiceB: "B)fontcolor()",
        choiceC: "C)bold()",
        choiceD: "D)fontsize()",
        correct: "D"
    }, {
        question: "Which of the following function of Array object returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found?",
        imgSrc: "img/css.png",
        choiceA: "A)lastIndexOf()",
        choiceB: "B)join()",
        choiceC: "C)indexOf()",
        choiceD: "D)map()",
        correct: "A"
    }, {
        question: "Which of the following is the correct syntax to create a cookie using JavaScript?",
        imgSrc: "img/css.png",
        choiceA: "A)browser.cookie = 'key1 = value1;key2 = value2;expires = date '",
        choiceB: "B)document.cookie = 'key1 = value1;key2 = value2;expires = date ';",
        choiceC: "C)window.cookie = 'key1 = value1;key2 = value2;expires = date ';",
        choiceD: "D)navigator.cookie = 'key1 = value1;key2 = value2;expires = date '",
        correct: "B"
    }, {
        question: "Which of the following is an advantage of using JavaScript?",
        imgSrc: "img/css.png",
        choiceA: "A)Less server interaction",
        choiceB: "B)Immediate feedback to the visitors",
        choiceC: "C)Increased interactivity",
        choiceD: "D)All of the above.",
        correct: "D"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 300; // 5min
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
            (scorePerCent >= 40) ? "img/3.png" :
                (scorePerCent >= 20) ? "img/2.png" :
                    "img/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}