let tint;
let alpha;
let tileSize = 24;
let cols, rows;

let maxParticles = 300;

let flowField = [];

let attractorPoints = [];

let xOff = 0;
let yOff = 0;
let zOff = 0;
let increment = 0.01;

function setup() {
	createCanvas(600, 600);

	tint = color(random(255), random(255), random(255));
	alpha = 20;

	cols = width / tileSize;
	rows = height / tileSize;

	particleArray = [];
	for (var i = 0; i < 300; i++) {
		particleArray[i] = new Particle();
	}

	// createLoop({ duration: 3, gif: true });
}

function draw() {
	// Drawing the background with an alpha will add the trail effect;
	background(0, alpha);

	stroke(tint);

	// Vector field based on generated perlin noise;
	// noiseFlowField();

	// Vector field based on the attractor points position;
	pointFlowField();
	moveAttractorPoints();
}

function noiseFlowField() {
	yOff = 0;
	for (let y = 0; y < rows; y++) {
		xOff = 0;
		for (let x = 0; x < cols; x++) {
			let index = x + y * cols;
			let angle = noise(xOff, yOff, zOff) * TWO_PI;
			// From angle creates a normalized vector.
			let flowVector = p5.Vector.fromAngle(angle);
			flowField[index] = flowVector;

			xOff += increment;
		}

		yOff += increment;
		zOff += 0.0003;
	}

	for (var i = 0; i < maxParticles; i++) {
		particleArray[i].follow(flowField);
		particleArray[i].update();
		particleArray[i].handleEdges();
		particleArray[i].show();
	}
}

function pointFlowField() {
	// Loops through a grid and create a vector for each point in the grid
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			let index = x + y * cols;
			let position = createVector(x * cols, y * rows);

			// Check what is the closest attractor point
			// and create a vector pointing at it
			let flowVector = createVector(width, height);

			for (let i = 0; i < attractorPoints.length; i++) {
				let attractor = attractorPoints[i];
				let direction = p5.Vector.sub(attractor, position);

				if (direction.mag() < flowVector.mag()) {
					flowVector = direction;
				}
			}

			// Normalized maintains the direction, but make the length 1
			// So the magnitude is consistent in all vectors;
			flowVector.normalize();

			flowField[index] = flowVector;
		}
	}

	for (var i = 0; i < maxParticles; i++) {
		particleArray[i].follow(flowField);
		particleArray[i].update();
		particleArray[i].handleRange(attractorPoints);
		particleArray[i].show();
	}
}

function moveAttractorPoints() {
	// Move the attraction points based on perlin noise;
	for (let i = 0; i < attractorPoints.length; i++) {
		let attractor = attractorPoints[i];
		attractor.x = noise(xOff + i) * width;
		attractor.y = noise(yOff + i + 10) * height;
	}

	xOff += 0.01;
	yOff += 0.01;
}

function mouseClicked() {
	attractorPoints.push(createVector(mouseX, mouseY));
}
