let cave;

let grid = [];

// Cell size will be used to scale the grid when displayed;
let cellSize = 1.5;

// grid is a square with size given by the formula -> (2^sizeFactor) + 1
let sizeFactor = 8;
let gridSize;

let roughness = 0.5;
let roughnessDecay = 0.6;

function setup() {
	gridSize = pow(2, sizeFactor) + 1;
	createCanvas(gridSize * cellSize, gridSize * cellSize);

	// cave = new Cave(4);
	// cave.show();

	diamondSquare();
	drawGrid();
}

function drawGrid() {
	for (let y = 0; y < gridSize; y++) {
		for (let x = 0; x < gridSize; x++) {
			let cell = grid[y][x];

			fill(cell * 255);
			stroke(cell * 255);
			square(x * cellSize, y * cellSize, cellSize);
		}
	}
}

// Diamond square algorithm. https://www.wikiwand.com/en/Diamond-square_algorithm
function diamondSquare() {
	// Create a 2D array and assign random values to the 4 corners
	grid = initializeGrid(0.6);

	// Recursively divide the grid and assign random values to each cell
	let stepSize = gridSize - 1;
	let roughnessFactor = roughness;

	while (stepSize > 1) {
		diamondStep(stepSize, roughnessFactor);
		squareStep(stepSize, roughnessFactor);

		// Reduce the roughness factor for the next iteration
		roughnessFactor *= roughnessDecay;
		stepSize /= 2;
	}
}

function diamondStep(stepSize, roughnessFactor) {
	let halfStep = stepSize / 2;

	for (let y = 0; y < gridSize - 1; y += stepSize) {
		for (let x = 0; x < gridSize - 1; x += stepSize) {
			let avarage =
				grid[y][x] +
				grid[y][x + stepSize] +
				grid[y + stepSize][x] +
				grid[y + stepSize][x + stepSize];

			// Calculate the mean and add a random value to the result
			// the random value is a small disturbance for the height map
			avarage /= 4.0;
			avarage += (random() * 2 - 1) * roughnessFactor;

			grid[y + halfStep][x + halfStep] = avarage;
		}
	}
}

function squareStep(stepSize, roughnessFactor) {
	let halfStep = stepSize / 2;

	for (let y = 0; y < gridSize; y += halfStep) {
		// x = (y + halfStep) % stepSize -> makes sure the X axis will ways be in
		// the center of the square
		for (let x = (y + halfStep) % stepSize; x < gridSize; x += stepSize) {
			let avarage = 0.0;
			let cellsInside = 0;

			// Current x, y is the center of the square,
			// add the TOP, BOTTOM, LEFT and RIGHT neighbours inside the grid to avarage
			if (y - halfStep >= 0) {
				avarage += grid[y - halfStep][x];
				cellsInside++;
			}
			if (y + halfStep < gridSize) {
				avarage += grid[y + halfStep][x];
				cellsInside++;
			}
			if (x - halfStep >= 0) {
				avarage += grid[y][x - halfStep];
				cellsInside++;
			}
			if (x + halfStep < gridSize) {
				avarage += grid[y][x + halfStep];
				cellsInside++;
			}

			// Calculate the mean and add a random value to the result
			// the random value is a small disturbance for the height map
			avarage /= cellsInside;
			avarage += (random() * 2 - 1) * roughnessFactor;

			grid[y][x] = avarage;
		}
	}
}

function initializeGrid(initialRange) {
	let grid = [];

	for (let y = 0; y < gridSize; y++) {
		grid[y] = [];
		for (let x = 0; x < gridSize; x++) {
			grid[y][x] = 0;
		}
	}

	grid[0][0] = random(initialRange);
	grid[0][gridSize - 1] = random(initialRange);
	grid[gridSize - 1][0] = random(initialRange);
	grid[gridSize - 1][gridSize - 1] = random(initialRange);

	return grid;
}

// function mouseClicked() {
// 	save("image.jpg");
// }
