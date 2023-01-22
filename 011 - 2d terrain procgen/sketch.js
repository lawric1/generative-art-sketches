function setup() {
	// createCanvas(400, 400);
	// let cave = new Cave(4);
	// cave.show();

	let island = new Island(1.5, 8, 1, 0.6);
	createCanvas(island.canvasSize, island.canvasSize);
	island.show();
}

// function mouseClicked() {
// 	save("image.jpg");
// }
