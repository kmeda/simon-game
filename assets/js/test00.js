var sequence = [];
var player = [];
var copySequence;

var strict = false;
var powerOn = false;

var COUNT;

var win;

var speed = 1000;

var feedback1 = new Audio();
var feedback2 = new Audio();
var feedback3 = new Audio();
var feedback4 = new Audio();

var errorBuzz = new Audio();

$('.slider').click(function(){
  powerOn = true;

});
