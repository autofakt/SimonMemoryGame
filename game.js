var buttonColours =  ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence(){
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
console.log(randomChosenColour);
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

function buttonClicked(){
  var userChosenColor =  $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log(userClickedPattern);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $('#'+currentColor).addClass("pressed");
  setTimeout(function(){
        $('#'+currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(buttonClicked);

nextSequence();