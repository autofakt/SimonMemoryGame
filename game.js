var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameLive = false;
var level = 0;
var userTurnNum = 0;


$(document).keypress(function() {
  if (gameLive == false) {
    nextSequence();
    gameLive = true;
  }
});


function nextSequence() {
  userTurnNum = 0;
  userClickedPattern = [];
  console.log("User Array: " + userClickedPattern);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#level-title").text("Level " + level++);
  setTimeout(function() {
    playSequence();
  }, 1000);
}

function playSequence() {

  for (var i = 0; i < gamePattern.length; i++) {
    playHelper(i);
  }
}

function playHelper(i) {
  setTimeout(function() {
    $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
  }, 750 * i);
}

function buttonClicked() {
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log("User Array in CLICK: " + userClickedPattern);
  checkAnswer();
  console.log("Game live: " + gameLive);
  if (userTurnNum == gamePattern.length && gameLive == true) {
    console.log("here");
    nextSequence();
  }
}

function checkAnswer() {
  userTurnNum = 0;
  for (var i = 0; i < userClickedPattern.length; i++) {
    userTurnNum++;
    console.log("Game Pattern i: " + gamePattern[i]);
    if (gamePattern[i] == userClickedPattern[i]) {
      console.log("match");
    } else {
      wrongAnswer();
      return;
    }
    console.log("User turn #: " + userTurnNum);
  }
}

function wrongAnswer() {
  playSound("wrong");
  gameLive = false;
  $("#level-title").text("Press A Key to Start");
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColor).removeClass("pressed");
  }, 100);
}

$(".btn").click(buttonClicked);
