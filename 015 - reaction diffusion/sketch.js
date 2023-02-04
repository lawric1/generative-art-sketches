let grid = [];
let next = [];
let diffusionA = 1.0;
let diffusionB = 0.5;
let feedRate = 0.0545;
let killRate = 0.062;

function setup() {
	createCanvas(200, 200);

	for (let row = 0; row < width; row++) {
		grid[row] = [];
		next[row] = [];
		for (let col = 0; col < height; col++) {
			let startA = 1;
			let startB = 0;

			grid[row][col] = { a: startA, b: startB };
			next[row][col] = { a: startA, b: startB };
		}
	}

	for (let row = 50; row < 100; row++) {
		for (let col = 50; col < 100; col++) {
			grid[row][col].b = 1;
			next[row][col].b = 1;
		}
	}

	for (let row = 150; row < 200; row++) {
		for (let col = 150; col < 200; col++) {
			grid[row][col].b = 1;
			next[row][col].b = 1;
		}
	}
}

function draw() {
	background(255);
	for (let index = 0; index < 50; index++) {
		for (let row = 1; row < width - 1; row++) {
			for (let col = 1; col < height - 1; col++) {
				next[row][col].a += nextA(row, col);
				next[row][col].b += nextB(row, col);

				next[row][col].a = constrain(next[row][col].a, 0, 1);
				next[row][col].b = constrain(next[row][col].b, 0, 1);
			}
		}

		loadPixels();
		for (let row = 0; row < width; row++) {
			for (let col = 0; col < height; col++) {
				let index = (row + col * width) * 4;

				var a = next[row][col].a;
				var b = next[row][col].b;
				var c = floor((a - b) * 255);
				c = constrain(c, 0, 255);

				pixels[index + 0] = c;
				pixels[index + 1] = c;
				pixels[index + 2] = c;
				pixels[index + 3] = 255;
			}
		}
		updatePixels();

		grid = next;
	}
}

function nextA(row, col) {
	let cell = grid[row][col];
	let a = cell.a;
	let b = cell.b;

	let result = diffusionA * convolve(row, col, "A");
	result -= a * b * b;
	result += feedRate * (1 - a);

	return result;
}

function nextB(row, col) {
	let cell = grid[row][col];
	let a = cell.a;
	let b = cell.b;

	let result = diffusionB * convolve(row, col, "B");
	result += a * b * b;
	result -= (killRate + feedRate) * b;

	return result;
}

function convolve(row, col, type) {
	// Apply a laplacian kernel to current cell
	// and return the sum of weighted neighbours.

	let kernel = [
		[0.05, 0.2, 0.05],
		[0.2, -1, 0.2],
		[0.05, 0.2, 0.05],
	];

	let sum = 0;

	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			let weight = kernel[i + 1][j + 1];
			let cell = grid[row + i][col + j];

			if (type === "A") {
				sum += weight * cell.a;
			} else if (type === "B") {
				sum += weight * cell.b;
			}
		}
	}

	return sum;
}

function keyPressed() {
	if (key === "g") {
		saveGif("mySketch", 5);
	}

	if (key === "s") {
		save("image.jpg");
	}
}
