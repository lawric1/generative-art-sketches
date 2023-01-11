function setup() {
	createCanvas(400, 400);
	fill(0);
	stroke(255);

	cellArray = [];

	for (let i = 0; i < 10; i++) {
		cellArray.push(new Cell(random(width), random(height), random(40, 60)));
	}

	// createLoop({ duration: 5, gif: true });
}

function draw() {
	background(0);

	for (let i = 0; i < cellArray.length; i++) {
		let cell = cellArray[i];
		cell.show();
		cell.update();

		if (cell.done) {
			// Add two new cells to array.
			cellArray.push(new Cell(cell.x, cell.y, cell.radius / 2, cell.xOff, cell.yOff));
			cellArray.push(
				new Cell(
					cell.x,
					cell.y,
					cell.radius / 2,
					cell.xOff + random(0.1),
					cell.yOff + random(0.1),
					random(-0.002, 0.004)
				)
			);

			// Remove cell from array.
			cellArray.splice(i, 1);
		}
	}
}

function mitosis() {}
