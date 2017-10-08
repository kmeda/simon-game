


var feedback1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var feedback2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var feedback3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var feedback4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var buzzer = new Audio('https://s3-us-west-2.amazonaws.com/guylemon/Buzzer.mp3');
var victory = new Audio('http://www.wavsource.com/snds_2017-09-17_1751672946049674/sfx/fanfare_x.wav');


var strictMode = false;
var gameOn = false;
var stepCount = 0;

var simon = {
  initializeUI :  function(){
                      this.uiControls()
                    },

  uiControls :      function(){
                    // turns the device on
                    // Activates controls
                    // turns the device off and deactivates controls
                    $('.slider').click(function(e){
                      e.stopPropagation();
                        simon.turnOnDevice();
                      if (!($(this).hasClass('slider-on'))) {
                        simon.turnOffDevice();
                      }
                    });

                    $('.start').click(function(){ //Starts the game
                        simon.startGame();
                    });

                    $('.strict').click(function(e){ //Sets flag to reset the game if player input is wrong
                      e.stopPropagation();
                      simon.strictMode()
                    });
                  },

  sequence: [],

  colors: ['RED', 'GREEN', 'YELLOW', 'BLUE'],

  step: 0,

  animate: function(sequence){

                          var i = 0;
                          var animation = setInterval(function(){
                            if (sequence[i]==='BLUE') {
                              feedback1.play();
                            }
                            if (sequence[i]==='RED') {
                              feedback2.play();
                            }
                            if (sequence[i]==='GREEN') {
                              feedback3.play();
                            }
                            if (sequence[i]==='YELLOW') {
                              feedback4.play();
                            }
                            $('.'+sequence[i]).animate({'opacity': '1'});

                            $('.'+sequence[i]).delay('100ms').animate({'opacity': '0.6'});

                            i++;
                            if (i >= sequence.length) {
                              $('.colortabs').css({'pointer-events': 'all'});
                              clearInterval(animation);
                            }
                          }, 600);

                    },

  nextSequence:     function(){
                      $('.count').html(stepCount);
                      this.sequence.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
                      //Animate sequence here ...
                      $('.colortabs').css({'pointer-events': 'none'});
                      setTimeout(function(){
                        simon.animate(simon.sequence);
                        $('.colortabs').css({'pointer-events': 'all'});
                      }, 500);
                    },

  startGame:        function(){
                      $('.center .text').html("Simon");
                      $('.start').css({'pointer-events': 'none'});
                      $('.start').addClass('start-game');
                      gameOn = true;
                      stepCount = 1;
                      this.nextSequence();
                    },

  playerSequence:     function(color){
                      if (!gameOn) {
                        return;
                      }
                      if (color === this.sequence[this.step]) {
                        if (this.step === this.sequence.length -1) {
                          if (stepCount === 20) {
                            $('.center .text').html("Winner");
                            victory.play();
                            this.resetGame();
                            return;
                          }
                          this.step = 0;
                          stepCount += 1;
                          this.nextSequence();
                        } else {
                          this.step++;
                        }
                      } else {
                        buzzer.play();
                        if (strictMode) {
                          this.resetGame();
                          $('.center .text').html("Try Again");
                          $('.count').html('!!');
                        } else {
                          this.step = 0;
                          $('.colortabs').css({'pointer-events': 'none'});
                          setTimeout(function(){
                            simon.animate(simon.sequence);
                          }, 800);
                        }

                      }
                    },

  resetGame:        function(){
                      gameOn = false;
                      stepCount = 0;
                      this.sequence = [];
                      this.step = 0;
                      $('.start').removeClass('start-game');
                      $('.start').css({'pointer-events': 'all'});
                    },

  turnOffDevice:    function(){
                      this.resetGame();
                      $('.start').removeClass('start-game');
                      $('.strict').removeClass('strict-on');
                      $('.count').removeClass('count-on');
                      $('.start, .strict').css({'pointer-events': 'none'});
                    },

  turnOnDevice:     function(){
                      $('.slider').toggleClass('slider-on');
                      $('.center .text').html("Simon");
                      $('.count').addClass('count-on').html('__');
                      $('.start, .strict').css({'pointer-events': 'all'});
                    },

  strictMode:       function(){
                      if (!gameOn) {
                        $('.strict').toggleClass('strict-on');
                        strictMode = strictMode === true ? false : true;
                      }
                    }

}


$(document).ready(function(){

  simon.initializeUI();

  $('.colortabs').on('click', function(){
    $(this).animate({'opacity': '1'});
    $(this).delay('200ms').animate({'opacity': '0.6'});
  });

  $('.BLUE').click(function(){
    simon.playerSequence('BLUE');
    feedback1.play();
  });
  $('.RED').click(function(){
    simon.playerSequence('RED')
    feedback2.play();
  });
  $('.GREEN').click(function(){
    simon.playerSequence('GREEN');
    feedback3.play();
  });
  $('.YELLOW').click(function(){
    simon.playerSequence('YELLOW');
    feedback4.play();
  });


});
