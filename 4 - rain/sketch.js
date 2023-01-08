function setup() {
	createCanvas(400, 400);
	frameRate(45);

	rainAmount = 100;
	raindropArray = [];

	// Instantiate all raindrops that will be drawn.
	for (let i = 0; i < rainAmount; i++) {
		raindropArray.push(new Raindrop());
	}
}

function draw() {
	background(0);

	for (let i = 0; i < rainAmount; i++) {
		let raindrop = raindropArray[i];

		fill(raindrop.depth);
		// Decrease luma for the ripple color.
		stroke(raindrop.depth - 160);

		raindrop.show();
		raindrop.update();
	}
}
