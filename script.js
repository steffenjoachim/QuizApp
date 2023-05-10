let questions = [

    {
        "question": "Wer hat HTML erfunden?",
        "answer-1": "Bill Gates",
        "answer-2": "Vinton Cerf",
        "answer-3": "Tim Berners-Lee",
        "answer-4": "Robert Kahn",
        "right-answer": 3
    },
    {
        "question": "Wie zentriert man ein Element auf der x-Achse?",
        "answer-1": "justify-content: center",
        "answer-2": "justify-content: middle",
        "answer-3": "align-items: center",
        "answer-4": "align-items: middle",
        "right-answer": 1
    },
    {
        "question": "Wie zentriert man ein Element auf der y-Achse?",
        "answer-1": "justify-content: center",
        "answer-2": "justify-content: middle",
        "answer-3": "align-items: center",
        "answer-4": "align-items: middle",
        "right-answer": 3
    },
    {
        "question": "Mit welcher Programiersprache bestimmt man das Design einer Webseite?",
        "answer-1": "HTML",
        "answer-2": "JavaScript",
        "answer-3": "Python",
        "answer-4": "CSS",
        "right-answer": 4
    },
    {
        "question": "Mit welcher JavaScript funktion kann man die Nachkommastellen einer Zahl festlegen??",
        "answer-1": "parseFloat()",
        "answer-2": "toFixed()",
        "answer-3": "valueOf()",
        "answer-4": "toLocaleString()",
        "right-answer": 2
    }
]

let currentQuestion = 0;
let rightQuestions = 0;
let audio_success = new Audio('./audio/success.wav');
let audio_fail = new Audio('./audio/fail.wav');

function init() {
    document.getElementById('numberQuestionsTotal').innerHTML = questions.length;
    showQuestions();
}


function showQuestions() {
    if (gameOver()) {
        showEndScreen();
    } else {
        showPlayScreen();
    }
}

function gameOver(){
    return currentQuestion >= questions.length
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);

    let idOfRightAnswer = `answer${question['right-answer']}`
    
    if (rightQuestinSelected(selectedQuestionNumber, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions = rightQuestions + 1;
        audio_success.play();
        showRightAnsweredQuestions(rightQuestions);
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audio_fail.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightQuestinSelected(selectedQuestionNumber, question){
    return selectedQuestionNumber == question['right-answer']
}

function nextQuestion() {
    currentQuestion++;

    document.getElementById('next-button').disabled = true;

    resetAnswerButtons();
    showQuestions();
    showQuestionNumber(currentQuestion);

}

function resetAnswerButtons() {
    for (let i = 1; i < questions.length; i++) {
        document.getElementById(`answer${i}`).parentNode.classList.remove('bg-success');
        document.getElementById(`answer${i}`).parentNode.classList.remove('bg-danger');
    }
}

function showQuestionNumber(index) {
    document.getElementById('currentQuestionNumber').innerHTML = index + 1;
}

function showRightAnsweredQuestions(rightQuestions){
document.getElementById('rightAnswers').innerHTML = rightQuestions;
}

function startGame(){
    currentQuestion = 0;
    rightQuestions = 0;
    document.getElementById('rightAnswers').innerHTML = rightQuestions;
    document.getElementById('quizEnded').classList.add('d-none');
    document.getElementById('quizStandard').classList.remove('d-none');
    document.getElementById('progress').classList.remove('d-none');
    document.getElementById('currentQuestionNumber').innerHTML = 1;
    init();
}

function showEndScreen(){
    document.getElementById('quizEnded').classList.remove('d-none');
    document.getElementById('quizStandard').classList.add('d-none');
    document.getElementById('totalAnswers').innerHTML = questions.length;
    document.getElementById('progress').classList.add('d-none');
}

function showPlayScreen(){
        calculatePercentage();
        
        let question = questions[currentQuestion];

        document.getElementById('question').innerHTML = question['question'];
        document.getElementById('answer1').innerHTML = question['answer-1'];
        document.getElementById('answer2').innerHTML = question['answer-2'];
        document.getElementById('answer3').innerHTML = question['answer-3'];
        document.getElementById('answer4').innerHTML = question['answer-4'];
}

function calculatePercentage(){
    let percent = currentQuestion / questions.length;
        // Math.round wird in diesem Beispiel nicht benötigt, aber wenn sich die Anzahl der Fragen ändern würde:
        percent = Math.round( percent * 100);
        document.getElementById('progress-bar').innerHTML = `${percent} %`
        document.getElementById('progress-bar').style = `width: ${percent}%`

}