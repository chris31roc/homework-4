//Questions and answer
var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices:["<script>", "<js>", "<javascript>", "<scripting>" ],
        answer: "<script>"          
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices:["Both the <head> section and the <body> section are correct", "The <body> section", "The <head> section", "the <footer>"],
        answer: "Both the <head> section and the <body> section are correct"  
    },
    {
        title:"How can you add a comment in a JavaScript?",
        choices:["<!--This is a comment-->", "'This is a comment", "//This is a comment", "(This is a comment)"],
        answer:"//This is a comment"
    },
    {
        title:"How does a FOR loop start?",
        choices:["for (i = 0; i <= 5)", "for (i <= 5; i++)", "for (i = 1 to 5)" ,"for (i = 0; i <= 5; i++)"],
        answer:"for (i = 0; i <= 5; i++)"    
    },
    {
        title:"Which event occurs when the user clicks on an HTML element?",
        choices:["onclick", "onmouseover", "onmouseclick", "onchange"],
        answer:"onclick"   
    },
    {
        title:"How do you declare a JavaScript variable?",
        choices:["variable carName=", "var carName=", "v carName=", "carName="],
        answer:"var carName="     
    },
    {
        title:"How do you create a function in JavaScript?",
        choices:["function = myFunction()", "function:myFunction()","function myFunction()", "myFunction()=function"],
        answer:"function myFunction()"    
    }
]

var questionIndex = 0;
var score = 0;

var time = document.querySelector("#time");
var timer = document.querySelector("#startTime");
var questionsBox = document.querySelector("#questionsBox");
var container = document.querySelector("#container");


var secondsLeft = 70;
// interval time
var holdInterval = 0;
// penalty time
var penalty = 5;
// Creating of elements for the choices
var olCreate = document.createElement("ol");

// Set of timer
timer.addEventListener("click", function () {
    
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            time.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                time.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
}); 

// function to render questions: 
function render(questionIndex) {
    // Clears questionBox text
    questionsBox.innerHTML = "";
    olCreate.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        // Appends question title 
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsBox.textContent = userQuestion;
    }
    // for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsBox.appendChild(olCreate);
        olCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
//compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        //created div to display the answer after user choice
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            
        } else {
            // deduction of -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The right answer is:  " + questions[questionIndex].answer;
        }

    }
    
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user resultats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsBox.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsBox.innerHTML = "";
    time.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsBox.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsBox.appendChild(createP);

    // Calculates time remaining and mutiply with the score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + score * secondsLeft;

        questionsBox.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsBox.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsBox.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsBox.appendChild(createSubmit);

    // Add initials and score to local storage 
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: score * secondsLeft
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Go to highscores page
            window.location.replace("./HighScores.html");
        }
    });

}