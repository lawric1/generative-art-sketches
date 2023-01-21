class Cave {
	constructor(tileSize) {
		this.grid = [];
		this.cellSize = tileSize || 6;
		this.gridWidth = width / this.cellSize;
		this.gridHeight = height / this.cellSize;

		this.cellType = { FLOOR: 0, ROCK: 1, WALL: 2 };
		this.cellColor = { FLOOR: [120, 90, 60], ROCK: [45, 50, 50], WALL: [90, 95, 95] };

		// Chance of a Rock being spawn;
		this.spawnChance = 0.515;

		// Number of times the simulation will run. Each time the grid becomes cleaner
		this.iterations = 16;
		this.desiredAmountToLive = 4;
		this.desiredAmountToRevive = 4;
	}

	show() {
		this.generateCave();

		// Iterate over the grid and render a Square based on each cell position
		for (let y = 0; y < this.gridHeight; y++) {
			for (let x = 0; x < this.gridWidth; x++) {
				let cell = this.grid[y][x];

				switch (cell) {
					case this.cellType.FLOOR:
						this.renderCell(x, y, this.cellColor.FLOOR);
						break;
					case this.cellType.ROCK:
						this.renderCell(x, y, this.cellColor.ROCK);
						break;
					case this.cellType.WALL:
						this.renderCell(x, y, this.cellColor.WALL);
						break;

					default:
						break;
				}
			}
		}
	}

	renderCell(x, y, tileColor) {
		// cellSize is used here to scale the cell so it fits in the canvas width and height

		fill(tileColor);
		stroke(tileColor);
		square(x * this.cellSize, y * this.cellSize, this.cellSize);
	}

	generateCave() {
		this.grid = this.createCellMap();

		// Apply a Cellular Automata algorithm to generate the cave structures
		// Each iteration removes the roughness of the cave
		for (let i = 0; i < this.iterations; i++) {
			this.grid = this.nextSimulationStep(this.grid);
		}

		// If there is a DIRT cell right below a ROCK cell, change it to a WALL cell
		this.grid = this.findWalls(this.grid);
	}

	createCellMap() {
		// Pick random values for each cell, the values can be either FLOOR or ROCK
		// the ratio will be defined by the spawnChance constant

		let cellMap = [];

		for (let y = 0; y < this.gridHeight; y++) {
			cellMap[y] = [];
			for (let x = 0; x < this.gridWidth; x++) {
				let state = random() < this.spawnChance ? this.cellType.ROCK : this.cellType.FLOOR;

				cellMap[y][x] = state;
			}
		}

		return cellMap;
	}

	nextSimulationStep(cellMap) {
		let newCellMap = [];

		for (let y = 0; y < this.gridHeight; y++) {
			newCellMap[y] = [];
			for (let x = 0; x < this.gridWidth; x++) {
				let aliveNeighboursAmount = this.countAliveNeighbours(cellMap, x, y);

				if (cellMap[y][x]) {
					if (aliveNeighboursAmount < this.desiredAmountToLive) {
						newCellMap[y][x] = this.cellType.FLOOR;
					} else {
						newCellMap[y][x] = this.cellType.ROCK;
					}
				} else {
					if (aliveNeighboursAmount > this.desiredAmountToRevive) {
						newCellMap[y][x] = this.cellType.ROCK;
					} else {
						newCellMap[y][x] = this.cellType.FLOOR;
					}
				}
			}
		}

		return newCellMap;
	}

	countAliveNeighbours(cellMap, x, y) {
		// Check all 8 neighbours of each cell and count the ones alive (ROCK)

		let count = 0;
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				let neighbourX = x + i;
				let neighbourY = y + j;

				// If we're looking at the middle point do nothing
				if (i == 0 && j == 0) {
					continue;
				}

				// In case the index we're looking at it off the edge of the map
				else if (
					neighbourX < 0 ||
					neighbourY < 0 ||
					neighbourY >= cellMap.length ||
					neighbourX >= cellMap[0].length
				) {
					count = count + 1;
				}

				// Otherwise, a normal check of the neighbour
				else if (cellMap[neighbourY][neighbourX] == this.cellType.ROCK) {
					count = count + 1;
				}
			}
		}

		return count;
	}

	findWalls(cellMap) {
		let newCellMap = [];

		for (let y = 0; y < this.gridHeight - 1; y++) {
			newCellMap[y] = [];
			for (let x = 0; x < this.gridWidth; x++) {
				if (
					cellMap[y][x] == this.cellType.ROCK &&
					cellMap[y + 1][x] == this.cellType.FLOOR
				) {
					newCellMap[y][x] = this.cellType.WALL;
				} else {
					newCellMap[y][x] = cellMap[y][x];
				}
			}
		}

		// Add last row to newCellMap, since its not added during the for loop
		newCellMap.push(cellMap[this.gridHeight - 1]);

		return newCellMap;
	}
}
