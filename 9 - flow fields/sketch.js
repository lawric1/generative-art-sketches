let tint;
let alpha;
let tileSize = 24;
let cols, rows;

let maxParticles = 200;

let flowField = [];

let influencePoints = [];

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
	for (var i = 0; i < maxParticles; i++) {
		particleArray[i] = new Particle();
	}

	// createLoop({ duration: 3, gif: true });
}

function draw() {
	// Drawing the background with an alpha will add the trail effect;
	background(0, alpha);
	stroke(tint);

	// noiseFlowField();
	// orbitFlowField();
	attractionFlowField();

	// moveInfluencePoints();

	drawParticles();
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

function attractionFlowField() {
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			let index = x + y * cols;
			let position = createVector(x * cols, y * rows);
			let flowVector = createVector(0, 0);

			let closestAttractor = createVector(0, 0);
			let closestDistance = Infinity;

			// Check what is the closest attractor point
			for (let i = 0; i < influencePoints.length; i++) {
				let attractor = influencePoints[i];
				let distance = p5.Vector.dist(attractor, position);

				if (distance < closestDistance) {
					closestDistance = distance;
					closestAttractor = attractor;
				}
			}

			flowVector = p5.Vector.sub(closestAttractor, position);
			flowVector.normalize();

			flowField[index] = flowVector;
		}
	}
}

function orbitFlowField() {
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			let index = x + y * cols;
			let position = createVector(x * cols, y * rows);
			let flowVector = createVector(0, 0);
			let closestOrbit = null;
			let closestDistance = Infinity;

			// Checks what is the closest orbit point;
			for (let i = 0; i < influencePoints.length; i++) {
				let orbit = influencePoints[i];
				let distance = p5.Vector.dist(position, orbit);

				if (distance < closestDistance) {
					closestDistance = distance;
					closestOrbit = orbit;
				}
			}

			// Threshold will make the orbit only affect close points;
			let thresholdDistance = 100;
			if (closestDistance < thresholdDistance) {
				let direction = p5.Vector.sub(position, closestOrbit);
				direction.normalize();
				flowVector = direction.rotate(HALF_PI);
			}

			flowField[index] = flowVector;
		}
	}
}

function moveInfluencePoints() {
	for (let i = 0; i < influencePoints.length; i++) {
		let point = influencePoints[i];
		point.x = noise(xOff + i) * width;
		point.y = noise(yOff + i + 10) * height;
	}

	xOff += increment;
	yOff += increment;
}

function drawParticles() {
	for (var i = 0; i < maxParticles; i++) {
		particleArray[i].follow(flowField);
		particleArray[i].update();
		particleArray[i].handleRange(influencePoints);
		particleArray[i].handleEdges();
		particleArray[i].show();
	}
}

function mouseClicked() {
	influencePoints.push(createVector(mouseX, mouseY));
}
