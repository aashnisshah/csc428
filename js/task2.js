/* context canvas and base variabls */
var context;
var canvas;
var HEIGHT = document.body.clientHeight;
var WIDTH = document.body.clientHeight;
var backgroundImage = "../img/background/task1.png";
var PART = 1;

var circle = {
	"1": {
		"left": {
			"startX": 350,
			"startY": 250,
			"radius": 20,
		},
		"right": {
			"startX": 500,
			"startY": 250,
			"radius": 20,
		},
	},
}

window.onload = function() {};

/* global variables */
function initializeGlobalVariables() {
	console.log('create global variables');
}


/** draw()
 * this function does all the drawing on the canvas
 */
function draw() {
	resetScreen();
	drawStraightLine(
		circle[PART].left.startX,
		circle[PART].left.startY,
		circle[PART].right.startX,
		circle[PART].right.startY,
		5
	);
	drawCircle(circle[PART].left.startX, circle[PART].left.startY, circle[PART].left.radius);
	drawCircle(circle[PART].right.startX, circle[PART].right.startY, circle[PART].right.radius);
}

/**
 * circle
 */
function drawCircle(startX, startY, radius) {
	context.beginPath();
	context.arc(startX, startY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'purple';
	context.fill();
	context.lineWidth = 3;
	context.strokeStyle = '#000000';
	context.stroke();
}

/**
 * straight line
 */
function drawStraightLine(startX, startY, endX, endY, lineWidth) {
	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.lineWidth = lineWidth;
	context.stroke();
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

	console.log(canvas);
	console.log(canvas.WIDTH);
	console.log(canvas.HEIGHT);

	var background = new Image();
	background.src = backgroundImage;
	context.drawImage(background, 0, 0);
}

/*
 * Reset Screen
 */
function resetScreen() {
	if(context) {
		context.fillRect(0, 0, WIDTH, HEIGHT);

		var background = new Image();
		background.src = backgroundImage;
		context.drawImage(background, 0, 0, WIDTH, HEIGHT);
	} else {
		console.log('no context');
	}
}

setup();
var listener = setInterval(main, 1);

/* main function */
function main() {
	draw();
}