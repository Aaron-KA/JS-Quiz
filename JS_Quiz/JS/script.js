var curPage = 0,
    correct = 0;
var myAnswers = [];
var myQuiz = [
    ["Inside which HTML element do we put the JavaScript?", 1, "script", "javascript", "js", "scripting"],
    ["Where is the correct place to insert a JavaScript?", 3, "Head Section", "Body Section", "Both Head and Body Section", "Outside HTML tag"],
    ["What is the correct syntax for referring to an external script called \"xyz.js\"?", 3, "script name= \"xyz.js\"", "script href= \"xyz.js\"", "script src= \"xyz.js\"", "script source= \"xyz.js\""],
    ["How do you create a function in JavaScript?", 2, "function = myFunction()", "function myFunction()", "function : myFunction()", "myFunction()"]
];
var myHeader = document.getElementById("quizHeader");
var classname = document.getElementsByClassName("answer");
var myQuestion = document.getElementById("questions");
var progressBar = document.getElementById("progressBar");
var btnNext = document.getElementById("btnNext");
var btnPrevious = document.getElementById("btnPrevious");
var btnFinish = document.getElementById("finishQuiz");
checkPage();
btnNext.addEventListener("click", moveNext);
btnPrevious.addEventListener("click", moveBack);
btnFinish.addEventListener("click", endQuiz);
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', myAnswer, false);
}

function myAnswer() {
    var idAnswer = this.getAttribute("data-id");
    myAnswers[curPage] = idAnswer;
    addBox();
}

function addBox() {
    for (var i = 0; i < myQuestion.children.length; i++) {
        var curNode = myQuestion.children[i];
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        } else {
            curNode.classList.remove("selAnswer");
        }
    }
}

function moveNext() {
    ///check if an answer has been made
    if (myAnswers[curPage]) {
        if (curPage < (myQuiz.length - 1)) {
            curPage++;
            checkPage(curPage);
        } else {
            if (myQuiz.length >= curPage) {
                endQuiz();
            }
        }
    }
}

function endQuiz() {
    if (myAnswers[2]) {
        document.getElementById("head").innerHTML = "Your Final Score";
        var output = "<div class='output'>Quiz Results<BR>";
        var questionResult = "NA";
        //console.log('Quiz Over');
        for (var i = 0; i < myAnswers.length; i++) {
            if (myQuiz[i][1] == myAnswers[i]) {
                questionResult = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
                correct++;
            } else {
                questionResult = '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>';
            }
            output = output + '<p>Question ' + (i + 1) + ' ' + questionResult + '</p> ';
        }
        output = output + '<p>You scored ' + correct + ' out of ' + myQuiz.length + '</p></div> ';
        document.getElementById("quizContent").innerHTML = output;
        '<input type="button" style="text-center" value="Refresh Page" class="btn btn-success btn-block" onClick="window.location.reload()">';
    }
}

function checkPage(i) {
    if (curPage == 0) {
        btnPrevious.classList.add("hide");
    } else {
        btnPrevious.classList.remove("hide");
    }
    if ((curPage + 1) < (myQuiz.length)) {
        btnNext.classList.remove("hide");
    } else {
        btnNext.classList.add("hide");
        btnFinish.classList.remove("hide");
    }
    myHeader.innerHTML = myQuiz[curPage][0];
    for (var i = 0; i < myQuestion.children.length; i++) {
        var curNode = myQuestion.children[i];
        curNode.childNodes[1].innerHTML = capitalise(myQuiz[curPage][(i + 2)]);
        //check if answered already
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        } else {
            curNode.classList.remove("selAnswer");
        }
    }
    ///update progress bar
    var increment = Math.ceil((curPage) / (myQuiz.length) * 100);
    progressBar.style.width = (increment) + '%';
    progressBar.innerHTML = (increment) + '%';
}

function moveBack() {
    if (curPage > 0) {
        curPage--;
        checkPage(curPage);
    }
}

function capitalise(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}