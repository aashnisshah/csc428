/* context canvas and base variabls */
var context;
var canvas;
var HEIGHT = document.body.clientHeight;
var WIDTH = document.body.clientHeight;
var offsetX = 0;
var offsetY = 0;
var backgroundImage = "../img/background/task1.png";
var PART = 1;
var TOTALPARTS = 3;
var TRACK = false;
var ATTEMPT = 1;
var NEXTTASK = false;

var circle = {
	"1": {
		"startX": 167,
		"startY": 250,
		"endX": 408,
		"endY": 250,
		"size": 120,

	},
	"2": {
		"circleX": 300,
		"circleY": 300,
		"startX": 300,
		"startY": 250,
		"endX": 300,
		"endY": 250,
		"size": 120,
		"radius": 50,

	},
	"3": {
		"circleX": 300,
		"circleY": 300,
		"startX": 300,
		"startY": 150,
		"endX": 300,
		"endY": 150,
		"size": 120,
		"radius": 150,
	},
	
}

window.onload = function() {};

/* global variables */
function initializeGlobalVariables() {
}


/** draw()
 * this function does all the drawing on the canvas
 */
function draw() {
	resetScreen();

	if(!NEXTTASK) {
		if(PART === 1) {
			drawSemiCircle(circle[PART].startY, circle[PART].size);
			drawCircle(circle[PART].startX, circle[PART].startY, 10, 'purple', 1);
			drawCircle(circle[PART].endX, circle[PART].endY, 10, 'purple', 1);
			context.font="18px verdana";
			context.strokeText('Start', circle[PART].circleX - 20, circle[PART].circleY + 30);
			context.strokeText('End', circle[PART].endX - 20, circle[PART].endY + 30);
		} else {
			drawCircle(circle[PART].circleX, circle[PART].circleY, circle[PART].radius, 'white', 3); // main circle
			drawCircle(
				circle[PART].circleX,
				circle[PART].startY,
				10,
				'purple',
				1); // start
			context.font="18px verdana";
			context.strokeText('Go Clockwise', circle[PART].startX - 45, circle[PART].startY + 60);
		}
	} else {
		context.strokeText('Click to go to the final page.', 150, 300);
	}
}

/**
 * Draw a Semi Circle
 */
function drawSemiCircle(startY, size) {
	context.beginPath();
	context.arc(288, startY, size, 0, Math.PI, true);
	context.lineWidth = 5;
	context.strokeStyle = '#000000';
	context.stroke();
}

/**
 * circle
 */
function drawCircle(startX, startY, radius, fill, lineWidth) {
	context.beginPath();
	context.arc(startX, startY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = fill;
	context.fill();
	context.lineWidth = lineWidth;
	context.strokeStyle = '#000000';
	context.stroke();
	context.font="10px verdana";
}

/**
 * straight line
 */
function drawStraightLine(startX, startY, endX, endY, lineWidth) {
	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.lineWidth = lineWidth;
	context.strokeStyle = '#000000';
	context.stroke();
	context.font="20px verdana";
}

/*
 * verifyClick
 * Used to verify if the click happened within the circle
 */
function verifyClick(x, y, circleX, circleY) {
	if(
		x >= circleX - 10 &&
		x <= circleX + 10 &&
		y >= circleY - 10 &&
		y <= circleY + 10 
	) {
		return true;
	}
}

/**
 * Event Listeners
 */
addEventListener("mousedown", function(click){
	console.log(click);
	if (verifyClick(click.layerX - offsetX, click.layerY - offsetY, circle[PART].startX, circle[PART].startY)) {
		console.log('Start tracking information: Task 2, Part ' + PART + ', Attempt ' + ATTEMPT);
		TRACK = true;
	}
}, false);

addEventListener("mouseup", function(click){
	if(NEXTTASK) {
		nextTask();
	}
	if (verifyClick(click.layerX - offsetX, click.layerY - offsetY, circle[PART].endX, circle[PART].endY)) {
		console.log('Stop tracking information: Task 2, Part ' + PART + ' completed in ' + ATTEMPT + ' attempt[s].');
		ATTEMPT = 1;
		if (PART < TOTALPARTS) {
			PART = PART + 1;
		} else {
			NEXTTASK = true;
		}
	} else {
		console.log('Stop tracking information: Task 2, Part ' + PART + ', Attempt ' + ATTEMPT + ' failed.');
		ATTEMPT = ATTEMPT + 1;
	}
	TRACK = false;
}, false);

addEventListener("mousemove", function(click){
	if (TRACK) {
		console.log('Timestamp: ' + click.timeStamp + ': x:' + click.x + ', y:' + click.y);
	}
}, false);

/**
 * Continue to next task
 */
function nextTask() {
	window.location.href = "../views/changeDevice.html";
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
	background.src = backgroundImage;
	context.drawImage(background, 0, 0);
	context.font="36px verdana";
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