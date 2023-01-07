let direction;

function drawCircle(pos, radius, color) {
	let spread = 8;

	for (x = pos.x - radius; x < pos.x + radius; x++) {
		yspan = radius * sin(acos((pos.x - x) / radius));
		for (y = pos.y - yspan; y < pos.y + yspan; y++) {
			let px = x + random(-spread, spread);
			let py = y + random(spread);
			point(px, py);
		}
	}
}

function drawLine(start, end, distance, color) {
	for (t = 0; t < 1; t += 0.001) {
		let pointX = start.x + (end.x - start.x) * t + random(-2, 3);
		let pointY = start.y + (end.y - start.y) * t + random(2);
		point(pointX, pointY);
	}
}

function setup() {
	createCanvas(600, 600);
	background(0);
	colorMode(HSB);

	let p0 = createVector(width / 2, height / 2);

	mainColor = random(255);

	for (i = 0; i < 20; i++) {
		let p1 = createVector(random(50, width - 50), random(50, height - 50));
		let distance = dist(p0.x, p0.y, p1.x, p1.y);

		let strokeColor = color(mainColor, distance / 2, distance / 4);
		stroke(strokeColor);

		drawLine(p0, p1, distance, "black");
		drawCircle(p1, distance / 8, "black");
	}

	for (i = 0; i < 100; i++) {
		point(random(width), random(height));
	}

	stroke("black");
	drawCircle(p0, 30, "white");

	// saveCanvas("sketch2", "jpg");
}

function draw() {}
