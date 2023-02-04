let size = 32;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(20);
	stroke(20);
	strokeWeight(5);

	tesselCube();
}

function tesselCube() {
	let x = 0;
	let y = 0;
	for (let row = 0; row < 10; row++) {
		for (let col = 0; col < 10; col++) {
			push();
			translate(x, y);
			drawCube();
			pop();

			push();
			translate(x + (size / 2) * 3, y + size);
			drawCube();
			pop();

			x += size * 3;
		}
		x = 0;
		y += size * 2;
	}
}

function drawCube() {
	fill(150, 150, 150);

	quad(0, 0, size, 0, size / 2, -size, -size / 2, -size);

	fill(90, 90, 70);
	quad(0, 0, -size / 2, -size, -size, 0, -size / 2, size);

	fill(30, 55, 65);
	quad(0, 0, -size / 2, size, size / 2, size, size, 0);
}

function keyPressed() {
	if (key === "g") {
		saveGif("mySketch", 5);
	}

	if (key === "s") {
		save("image.jpg");
	}
}
