function drawCircle(pos, radius, color) {
	circle(pos.x, pos.y, radius);
}

function drawLine(pos1, pos2, color) {
	fill(color);
	line(pos1.x, pos1.y, pos2.x, pos2.y);
}

function setup() {
	createCanvas(600, 600);
	background(0);
	colorMode(HSB);

	pos1 = createVector(width / 2, height / 2);

	mainColor = random(255);

	for (i = 0; i < 80; i++) {
		let pos2 = createVector(random(50, width - 50), random(50, height - 50));

		let distance = dist(pos1.x, pos1.y, pos2.x, pos2.y);

		// let strokeColor = color(pos2.x/2, pos2.y/2, 100);
		let strokeColor = color(mainColor, distance / 3, distance / 2);

		stroke(strokeColor);
		drawLine(pos1, pos2, "black");

		stroke(strokeColor);
		drawCircle(pos2, distance / 8, "black");
	}

	stroke("black");
	strokeWeight(4);
	fill(color(mainColor, 50, 50));
	drawCircle(pos1, 30, "black");
	fill(color(mainColor, 50, 0));
	drawCircle(pos1, 20, "black");

	// saveCanvas("sketch1", "jpg");
}

function draw() {}
