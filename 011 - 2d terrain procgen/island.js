class Island {
	constructor(cellSize, sizeFactor, roughness, roughnessDecay) {
		this.heightMap = [];

		// Cell size will be used to scale the grid when displayed
		this.cellSize = cellSize || 1.5;

		// heightMap is a 2d grid with size given by the formula -> (2^gridScale) + 1
		this.gridScale = sizeFactor || 8;
		this.gridSize = pow(2, this.gridScale) + 1;

		this.roughness = roughness || 0.5;
		this.roughnessDecay = roughnessDecay || 0.6;

		// Uses the scaled grid size as the canvas size
		this.canvasSize = this.gridSize * this.cellSize;

		this.palette = {
			WATER: ["rgb(56,103,175)", "rgb(65,124,201)"],
			SAND: ["rgb(183, 183, 71)", "rgb(242,223,152)"],
			GRASS: ["rgb(122,166,71)", "rgb(136,208,42)"],
			FOREST: ["rgb(102,136,59)", "rgb(67,114,95)"],
			MOUNTAIN: ["rgb(63,73,75)", "rgb(74,89,100)"],
		};
	}

	show() {
		this.diamondSquare();

		for (let y = 0; y < this.gridSize; y++) {
			for (let x = 0; x < this.gridSize; x++) {
				this.colorCell(x, y);
			}
		}
	}

	colorCell(x, y) {
		let [terrainType, minValue, maxValue] = this.getTerrainType(x, y);
		let colorPalette = this.palette[terrainType];
		let colorIndex = floor(
			map(this.heightMap[x][y], minValue, maxValue, 0, colorPalette.length)
		);
		let terrainColor = this.palette[terrainType][colorIndex];

		fill(terrainColor);
		stroke(terrainColor);
		square(x * this.cellSize, y * this.cellSize, this.cellSize);
	}

	getTerrainType(x, y) {
		// Assign terrain type based on the cell luminance

		if (this.heightMap[x][y] < 0.2) {
			return ["WATER", 0.0, 0.2];
		} else if (this.heightMap[x][y] < 0.3) {
			return ["SAND", 0.2, 0.3];
		} else if (this.heightMap[x][y] < 0.5) {
			return ["GRASS", 0.3, 0.5];
		} else if (this.heightMap[x][y] < 0.6) {
			return ["FOREST", 0.5, 0.6];
		} else if (this.heightMap[x][y] >= 0.6) {
			return ["MOUNTAIN", 0.6, 1];
		}
	}

	// Diamond square algorithm. https://www.wikiwand.com/en/Diamond-square_algorithm
	diamondSquare() {
		// Create a 2D array and assign random values to the 4 corners
		this.heightMap = this.initializeGrid(0.6);

		// Recursively divide the grid and assign random values to each cell
		let stepSize = this.gridSize - 1;
		let roughnessFactor = this.roughness;

		while (stepSize > 1) {
			this.diamondStep(stepSize, roughnessFactor);
			this.squareStep(stepSize, roughnessFactor);

			// Reduce the roughness factor for the next iteration
			roughnessFactor *= this.roughnessDecay;
			stepSize /= 2;
		}

		for (let y = 0; y < this.gridSize; y++) {
			for (let x = 0; x < this.gridSize; x++) {
				this.heightMap[x][y] = constrain(this.heightMap[x][y], 0, 0.999);
			}
		}
	}

	diamondStep(stepSize, roughnessFactor) {
		let halfStep = stepSize / 2;

		for (let y = 0; y < this.gridSize - 1; y += stepSize) {
			for (let x = 0; x < this.gridSize - 1; x += stepSize) {
				let avarage =
					this.heightMap[y][x] +
					this.heightMap[y][x + stepSize] +
					this.heightMap[y + stepSize][x] +
					this.heightMap[y + stepSize][x + stepSize];

				// Calculate the mean and add a random value to the result
				// the resulting value is a small disturbance for the height map
				avarage /= 4.0;
				avarage += (random() * 2 - 1) * roughnessFactor;

				this.heightMap[y + halfStep][x + halfStep] = avarage;
			}
		}
	}

	squareStep(stepSize, roughnessFactor) {
		let halfStep = stepSize / 2;

		for (let y = 0; y < this.gridSize; y += halfStep) {
			// x = (y + halfStep) % stepSize -> makes sure the X axis will ways be in
			// the center of the square
			for (let x = (y + halfStep) % stepSize; x < this.gridSize; x += stepSize) {
				let avarage = 0.0;
				let cellsInside = 0;

				// Current (y, x) is the center of the square,
				// Check if square points are inside the heightMap grid
				// and add them to the avarage
				if (y - halfStep >= 0) {
					avarage += this.heightMap[y - halfStep][x];
					cellsInside++;
				}
				if (y + halfStep < this.gridSize) {
					avarage += this.heightMap[y + halfStep][x];
					cellsInside++;
				}
				if (x - halfStep >= 0) {
					avarage += this.heightMap[y][x - halfStep];
					cellsInside++;
				}
				if (x + halfStep < this.gridSize) {
					avarage += this.heightMap[y][x + halfStep];
					cellsInside++;
				}

				// Calculate the mean and add a random value to the result
				// the resulting value is a small disturbance for the height map
				avarage /= cellsInside;
				avarage += (random() * 2 - 1) * roughnessFactor;

				this.heightMap[y][x] = avarage;
			}
		}
	}

	initializeGrid(initialRange) {
		let grid = [];

		for (let y = 0; y < this.gridSize; y++) {
			grid[y] = [];
			for (let x = 0; x < this.gridSize; x++) {
				grid[y][x] = 0;
			}
		}

		grid[0][0] = random(initialRange);
		grid[0][this.gridSize - 1] = random(initialRange);
		grid[this.gridSize - 1][0] = random(initialRange);
		grid[this.gridSize - 1][this.gridSize - 1] = random(initialRange);

		return grid;
	}
}
