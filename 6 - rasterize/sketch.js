function preload() {
	img = loadImage("./image.jpg");
}

function setup() {
	createCanvas(img.width, img.height);
	frameRate(5);
	tiles = 64;
	tileSize = img.width / tiles;

	slider = createSlider(2, 256, 2);
	slider.position(10, height);
	slider.style("width", width + "px");

	createLoop({ duration: 3, gif: true });
	// noLoop();
}

function draw() {
	background(0);
	tiles = slider.value();
	tileSize = img.width / tiles;

	for (let row = 0; row < tiles; row++) {
		for (let col = 0; col < tiles; col++) {
			let x = col * tileSize;
			let y = row * tileSize;

			let c = img.get(x, y);

			fill(color(c));
			stroke(color(c));
			square(x, y, tileSize);
		}
	}
}

function mouseReleased() {
	redraw();
}
