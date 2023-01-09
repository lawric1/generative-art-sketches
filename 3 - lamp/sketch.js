function setup() {
	createCanvas(600, 600);
	frameRate(10);
	colorMode(HSB);

	accentColor = color(random(255), 150, 255);
	// Lines
	LineTopStart = new Vector(width / 2, 0);
	LineTopEnd = new Vector(width / 2, height / 3);
	LineBottomStart = new Vector(width / 2, height / 3);
	LineBottomEnd = new Vector(width / 2, height / 2);

	// Circle
	circleOrigin = new Vector(width / 2, height / 2);

	// Trapezoid
	A = new Vector(290, 200);
	B = new Vector(310, 200);
	C = new Vector(340, 240);
	D = new Vector(260, 240);

	// createLoop({ duration: 3, gif: true });
}

function draw() {
	background(0);

	// Lines
	stroke(255);
	drawLine(LineTopStart, LineTopEnd, 7);
	stroke(100);
	drawLine(LineBottomStart, LineBottomEnd, 2);

	// Circles
	stroke(255);
	drawCircle(circleOrigin, 70);
	stroke(accentColor);
	drawCircle(circleOrigin, 5);

	// Trapezoid
	stroke(255);
	drawQuad(A, B, C, D);

	// Particles
	stroke(accentColor);
	for (t = 0; t < 50; t++) {
		let x = random(width / 3 + 30, width - width / 3 - 30);
		let y = random(height / 3 + 30, height - height / 3 - 30);
		point(x, y);
	}
}

// This next set of functions are for the custom drawing of the trapezoid

// Given three points, calculate the area of triangle.
function getTriangleArea(A, B, C) {
	return abs(0.5 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)));
}

function getTriangleAreaSum(triangles) {
	let sum = 0;
	for (let t of triangles) {
		let area = getTriangleArea(t[0], t[1], t[2]);

		sum += area;
	}

	return sum;
}

function getQuadArea(A, B, C, D) {
	let top = B.x - A.x; // Top width
	let bottom = C.x - D.x; // Botom width
	let height = D.y - A.y; // Height

	return ((top + bottom) / 2) * height;
}

// Given a point and quad coordinates, divide the quad in 4 triangles;
function divideQuadInTriangles(P, A, B, C, D) {
	let triangle1 = [P, A, B];
	let triangle2 = [P, B, C];
	let triangle3 = [P, C, D];
	let triangle4 = [P, D, A];

	return [triangle1, triangle2, triangle3, triangle4];
}

// Generate a random line, draw it if inside quad;
function drawQuad(A, B, C, D) {
	let qArea = getQuadArea(A, B, C, D);

	for (i = 0; i < 5000; i++) {
		let P = new Vector(random(D.x, C.x), random(A.y, D.y));

		// print(x, y)
		let triangles = divideQuadInTriangles(P, A, B, C, D);
		let tSum = getTriangleAreaSum(triangles);

		if (tSum == qArea) {
			let x = P.x + random(-5, 5);
			let y = P.y + random(-5, 5);
			point(x, y);
		}
	}
}

function drawLine(start, end, length) {
	for (t = 0; t < 1; t += 0.01) {
		let A = new Vector(
			start.x + (end.x - start.x) * t + random(-length, length),
			start.y + (end.y - start.y) * t + random(-length, length)
		);
		let B = new Vector(A.x + random(-length, length + 5), A.y + random(-length, length + 5));

		line(A.x, A.y, B.x, B.y);
	}
}

function drawCircle(origin, radius) {
	for (t = 0; t < 360; t++) {
		let x = radius * cos(t) + origin.x + random(-5, 5);
		let y = radius * sin(t) + origin.y + random(-5, 5);

		point(x, y);
	}
}
