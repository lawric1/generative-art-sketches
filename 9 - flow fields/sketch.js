let tileSize = 24;
let flowField = [];
let maxParticles = 300;
let cols, rows;
let xOff = 0;
let yOff = 0;
let zOff = 0;
let increment = 0.01;

function setup() {
	createCanvas(600, 600);

	cols = width / tileSize;
	rows = height / tileSize;

	particleArray = [];
	for (var i = 0; i < 300; i++) {
		particleArray[i] = new Particle();
	}

	// createLoop({ duration: 3, gif: true });
}

function draw() {
	background(0, 30);

	stroke("#0ce");

	// noiseFlowField();
	pointFlowField();
}

function noiseFlowField() {
	yOff = 0;
	for (let y = 0; y < rows; y++) {
		xOff = 0;

		for (let x = 0; x < cols; x++) {
			let index = x + y * cols;
			let angle = noise(xOff, yOff, zOff) * TWO_PI;
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
	let targets = [
		createVector(width / 2, 100),
		createVector(width / 2, height / 2),
		createVector(width / 2, height / 1.2),
	];
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			let index = x + y * cols;
			let position = createVector(x * cols, y * rows);
			let closestVector = createVector(width, height);

			for (let i = 0; i < targets.length; i++) {
				let target = targets[i];
				let direction = p5.Vector.sub(target, position);

				if (direction.mag() < closestVector.mag()) {
					closestVector = direction;
				}
			}

			closestVector.normalize();

			flowField[index] = closestVector;
		}
	}

	for (var i = 0; i < maxParticles; i++) {
		particleArray[i].follow(flowField);
		particleArray[i].update();
		particleArray[i].handleRange(targets);
		particleArray[i].show();
	}
}
