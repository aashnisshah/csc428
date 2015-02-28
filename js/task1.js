/* context canvas and base variabls */
var context;
var canvas;
var HEIGHT = document.body.clientHeight;
var WIDTH = document.body.clientHeight;

window.onload = function() {};

/* global variables */
function initializeGlobalVariables() {
	console.log('create global variables');
}


/** draw()
 * this function does all the drawing on the canvas
 */
function draw() {

}

/*
 * Setup
 */
function setup() {
	initializeGlobalVariables();
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	var background = new Image();
	background.src = "img/background/task1.png";
	context.drawImage(background, 0, 0);
}