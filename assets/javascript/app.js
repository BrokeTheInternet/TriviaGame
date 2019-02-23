// Create a start button to initiate the game

// First line segemnt should show the time remaining wiht a timer counting down

// Create a "trivia form" with multiple choice OR true/false options

// Player is only allowed to pick one answer for each question

// Game ends when time runs out. Once game ends a page will reveal the number of questiosn that players answered correctly and incorrectly

// ******************************************
// ********** GLOBAL VARIABLES **************
// ******************************************


$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-success btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
    //on-click event for start button to begin name
    
    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();  // added line to test issue on GitHub Viewer
        
        $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on('click', ".answer", function(event){

        var selectedAnswer = $(this).text();
        //ternary operator, if/else replacement
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(theClock);
            generateWin();
        } else {
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000);  //  change to 4000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);
        
        setTimeout(wait, 3000);  //end generatewin
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000); 
    }
    //end generate loss

    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
        $("#mainArea").html(gameHTML);
    } //end generate question
    
    function wait() {
        //ternary operator replacing if/else for generate more questions
        if (questionCounter < 7) { 
            questionCounter++;
            generateQuestions();
            counter = 30;
            timerWrapper();
        } else {
            finalScreen();
        }
    } //end function
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateQuestions();
        timerWrapper();
    }

    var openScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = 
    [ "How many days are in a week?", 
    "How many months are in a year?", 
    "How many seasons are in a year?", 
    "How many hours are in a day?", 
    "How many minutes are in a day?", 
    "What month has 28 days in it?", 
    "What is the 8th planet in our Solar System?", 
    "What is the name of the galaxy that we are in ?" ];

    var answerArray = [
        ["5 Days", "7 Days", "10 Days", "6 Days"], 
        ["6 Months","7 Months","12 Months","13 Months"], 
        ["4 Seasons", "6 Seasons", "3 Seasons", "8 Seasons"], 
        ["12 Hours", "24 Hours", "48 Hours", "23 Hours"], 
        ["720 Minutes", "600 Minutes", "1380 Minutes", "1440 Minutes"], 
        ["January","February","October","All of the above"], 
        ["Jupiter", "Neptune", "Uranus", "Saturn"], 
        ["The Andromeda Galaxy","The Sombrero Galaxy","The Milky Way Galaxy","The Whirlpool Galaxy"], ];

    var imageArray = new Array(); 
    imageArray[0] = "<img class='center-block' src='assets/images/7days.gif'>";
    imageArray[1] = "<img class='center-block' src='assets/images/months.gif'>"; 
    imageArray[2] = "<img class='center-block' src='assets/images/seasons.gif'>"; 
    imageArray[3] = "<img class='center-block' src='assets/images/hours.gif'>";  
    imageArray[4] = "<img class='center-block' src='assets/images/minutes.gif'>"; 
    imageArray[5] = "<img class='center-block' src='assets/images/all.gif'>"; 
    imageArray[6] = "<img class='center-block' src='assets/images/neptune.gif'>"; 
    imageArray[7] = "<img class='center-block' src='assets/images/milkyway.gif'>"; 

    var correctAnswers = 
    [ "B. 7 Days", 
    "C. 12 Months", 
    "A. 4 Seasons", 
    "B. 24 Hours", 
    "D. 1440 Minutes", 
    "D. All of the above", 
    "B. Neptune", 
    "C. The Milky Way Galaxy"];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;