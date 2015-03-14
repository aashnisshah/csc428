/* context canvas and base variabls */
var context;
var canvas;
var HEIGHT = document.body.clientHeight;
var WIDTH = document.body.clientHeight;
var offsetX = 0;
var offsetY = 0;
var backgroundImage = "../img/background/task1.png";
var PART = 1;
var TOTALPARTS = 1;
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
		drawSemiCircle(circle[PART].startY, circle[PART].size);
		drawCircle(circle[PART].startX, circle[PART].startY, 10);
		drawCircle(circle[PART].endX, circle[PART].endY, 10);
		context.font="18px verdana";
		context.strokeText('start', circle[PART].startX - 20, circle[PART].startY + 30);
		context.strokeText('end', circle[PART].endX - 20, circle[PART].endY + 30);
	} else {
		context.strokeText('Click to continue to the next round', 150, 300);
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
function drawCircle(startX, startY, radius) {
	context.beginPath();
	context.arc(startX, startY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'purple';
	context.fill();
	context.lineWidth = 1;
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
	window.location.href = "../index.html";
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