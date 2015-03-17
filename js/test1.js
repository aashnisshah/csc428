/* context canvas and base variabls */
var context;
var canvas;
var HEIGHT = document.body.clientHeight;
var WIDTH = document.body.clientHeight;
var offsetX = 0;
var offsetY = 0;
var backgroundImage = "../img/background/task1.png";
var PART = 1;
var TOTALPARTS = 2;
var ATTEMPT = 1;
var NEXTTASK = false;
var circle = {
	"1": {
		"startX": 120,
		"startY": 120,
		"radius": 100,
	},
	"2": {
		"startX": 400,
		"startY": 400,
		"radius": 20,
	},
}

window.onload = function() {};

/* global variables */
function initializeGlobalVariables() {
}


/**
 * draw()
 * this function does all the drawing on the canvas
 */
function draw() {
	resetScreen();
	if(!NEXTTASK) {
		drawCircle(circle[PART].startX, circle[PART].startY, circle[PART].radius);
	} else {
		context.font="36px verdana";
		context.strokeText('Click to continue to the next round', 150, 300);
	}
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

/*
 * verifyClick
 * Used to verify if the click happened within the circle
 */
function verifyClick(x, y) {
	if(
		x >= circle[PART].startX - circle[PART].radius &&
		x <= circle[PART].startX + circle[PART].radius &&
		y >= circle[PART].startY - circle[PART].radius &&
		y <= circle[PART].startY + circle[PART].radius 
	) {
		return true;
	}
}

/**
 * Event Listeners
 */
addEventListener("click", function(click){
	console.log('Start tracking information: Task 1, Part ' + PART + ', Attempt ' + ATTEMPT);
	if(NEXTTASK) {
		nextTask();
	}
	if (verifyClick(click.layerX - offsetX, click.layerY - offsetY)) {
		if (PART < TOTALPARTS) {
			PART = PART + 1;
			ATTEMPT = 1;
			console.log('Timestamp: ' + click.timeStamp + ': x:' + click.layerX + ', y:' + click.layerY);
		} else {
			NEXTTASK = true;
		}
	} else {
		ATTEMPT = ATTEMPT + 1;
	}
}, false);

/**
 * Continue to next task
 */
function nextTask() {
	window.location.href = "../views/retrytests.html";
}

/**
 * Setup
 */
function setup() {
	initializeGlobalVariables();
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

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