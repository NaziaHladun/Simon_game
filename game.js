var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".start-btn").click(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(".start-btn").hide();
    }
});

$(".btn").click(function(e){
    var idClicked = e.target.id;
    userClickedPattern.push(idClicked);

    animatePress(idClicked);
    playSound(idClicked);
    checkAnswer(userClickedPattern.length - 1)
});

function nextSequence() {   
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() 
            {nextSequence()}, 1000);
        }
    }
    else{
        playSound('wrong');
        $("#level-title").text("Game Over, Restart Button");
        $("body").addClass("game-over");
        setTimeout(function() 
            {$("body").removeClass("game-over")}, 200);
        startOver()
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {$("#" + currentColour).removeClass("pressed")}, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    $(".start-btn").text("Restart")
    $(".start-btn").show();
}

