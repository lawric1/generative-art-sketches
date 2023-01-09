function setup() {
	createCanvas(400, 400);

	snowAmount = 100;
	snowArray = [];
	for (let i = 0; i < snowAmount; i++) {
		const snow = new Snow();
		snowArray.push(snow);
	}

	// createLoop({ duration: 3, gif: true });
}

function draw() {
	background(30);

	for (let i = 0; i < snowAmount; i++) {
		const snow = snowArray[i];

		fill(snow.depth);
		stroke(0, 0, 0, 0);

		snow.show();
		snow.update();
	}
}
