var buttonColours =  ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameLive = false;
var level = 0;
var userTurnNum = 0;


$(document).keypress(function(){
  if(gameLive == false){
    nextSequence();
    gameLive = true;
  }
});


function nextSequence(){
  userTurnNum = 0;
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
console.log(randomChosenColour);
gamePattern.push(randomChosenColour);
$("#level-title").text("Level "+ level++);
playSequence();
//$("#"+randomChosenColour).fadeOut(100).fadeIn(100);
//playSound(randomChosenColour);
}

function playSequence(){

  for(var i = 0; i<gamePattern.length; i++){
        playHelper(i);
  }
}

function playHelper(i){
  setTimeout(function () {
    $("#"+gamePattern[i]).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
  }, 500 *i);
}

function buttonClicked(){
  var userChosenColor =  $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer();
  if (userTurnNum==gamePattern.length){
    userTurnNum =1;
    nextSequence();
  }
}

function checkAnswer(){
  for(var i = 0; i<gamePattern.length; i++){
    console.log("Game Pattern");
    console.log(gamePattern[i]);
    if(gamePattern[i]==userClickedPattern[i]){
      console.log("match");
    } else {
      alert("Wrong");
      return;
    }
    userTurnNum++;
    console.log("User turn #: " +  userTurnNum);
  }
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
