
var strictMode = false;
var gameOn = false;

var feedback1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var feedback2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var feedback3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var feedback4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var buzzer = new Audio('https://s3-us-west-2.amazonaws.com/guylemon/Buzzer.mp3');

var randomPattern = [];
var playerPattern = [];
var lockColors = false;
var playCount = 0;
var win = false;
var speed = 1000;


var initializeGame = function(){
  uiControl();
};

// turns the device on
// Activates controls
// turns the device off and deactivates controls
var uiControl = function(){
    $('.color').css({'pointer-events': 'none'});
    $('.slider').click(function(e){
      e.stopPropagation();
      $('.slider').toggleClass('slider-on');
      $('.count').addClass('count-on');
      $('.start, .strict').css({'pointer-events': 'all'});
      if (!($(this).hasClass('slider-on'))) {
        $('.start').removeClass('start-on');
        $('.strict').removeClass('strict-on');
        $('.count').removeClass('count-on');
        $('.start, .strict').css({'pointer-events': 'none'});
      }
    });

    $('.start').click(function(){ //Starts the game
      gameOn = true;
      $(this).css({'pointer-events': 'none'});
          if ($('.slider').hasClass('slider-on')) {
            $(this).addClass('start-on');
          }

    });

    $('.strict').click(function(e){ //Sets flag to reset the game if player input is wrong
      e.stopPropagation();
      if ($('.slider').hasClass('slider-on')) {
        $(this).toggleClass('strict-on');
        strictMode = strictMode === true ? false : true;
      }
});
};



$(document).ready(function(){

initializeGame();

});


/*


*/
