let circles = [];
let min = 10;
let max = 40;

// Initialize boids and UI elements
function setup() {
	createCanvas(400, 400);
	background(0);
}

function draw() {
	fill("#000");
	stroke("#F00");

	let c = createCircle();

	let attempts = 0;
	while (!isValid(c)) {
		c.x = random(width);
		c.y = random(height);
		attempts += 1;

		if (attempts > 100000) {
			return;
		}
	}

	while (isValid(c)) {
		c.radius += 1;
	}

	c.radius -= 3;

	circles.push(c);
	drawCircle(c);
}

function createCircle() {
	return {
		x: random(width),
		y: random(height),
		radius: min,
	};
}

function drawCircle(c) {
	// if (c.radius > max * 0.5) return;

	circle(c.x, c.y, c.radius * 2);
}

function isValid(circle) {
	if (circle.radius > max) {
		return false;
	}

	for (let i = 0; i < circles.length; i++) {
		let otherCircle = circles[i];
		let distance = dist(circle.x, circle.y, otherCircle.x, otherCircle.y);
		let desiredDistance = circle.radius + otherCircle.radius;

		if (distance < desiredDistance) {
			return false;
		}
	}

	return true;
}

function keyPressed() {
	if (key === "g") {
		saveGif("mySketch", 5);
	}

	if (key === "s") {
		save("image1.jpg");
	}
}
