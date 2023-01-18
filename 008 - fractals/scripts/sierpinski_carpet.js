function sierpinskiCarpet(radius) {
	let sides = [
		createVector(-radius / 1.5, -radius / 1.5),
		createVector(0, -radius / 1.5),
		createVector(radius / 1.5, -radius / 1.5),
		createVector(-radius / 1.5, 0),
		createVector(radius / 1.5, 0),
		createVector(-radius / 1.5, radius / 1.5),
		createVector(0, radius / 1.5),
		createVector(radius / 1.5, radius / 1.5),
	];

	fill(0);
	stroke(0, 0, 0, 0);

	square(0, 0, radius / 3);

	if (radius >= 4) {
		for (const pos of sides) {
			push();
			translate(pos.x, pos.y);
			sierpinskiCarpet(radius / 3);
			pop();
		}
	}
}
