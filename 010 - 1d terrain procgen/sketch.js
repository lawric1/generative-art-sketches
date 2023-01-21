let hue;

function setup() {
	createCanvas(400, 400);
	colorMode(HSB, 255);

	noLoop();
}

function draw() {
	background(0);
	hue = random(255);

	layer1 = createLayer("HIGH", 1, 50, 100);
	layer2 = createLayer("MID", 1, 30, 150);
	layer3 = createLayer("LOW_LEFT", 1.2, 30, 200);
	layer4 = createLayer("LOW_RIGHT", 1.4, 20, 250);

	layer1.show();
	layer2.show();
	layer3.show();
	layer4.show();
}

function createLayer(type, roughness, verticalDisplacement, brightness) {
	let start, end;

	if (type === "LOW_LEFT") {
		start = createVector(random(0, width / 3), height);
		end = createVector(width, height / 1.5);
	} else if (type === "LOW_RIGHT") {
		start = createVector(0, height / 1.2);
		end = createVector(random(width, width / 1.5), height);
	} else if (type === "MID") {
		start = createVector(0, height / 1.5);
		end = createVector(width, random(height / 2, height));
	} else if (type === "HIGH") {
		start = createVector(0, height / 2);
		end = createVector(width, height / 2);
	}

	// Hue shift the color as it gets darker;
	hue = hue + brightness / 4;
	let saturation = 50;
	let tint = color(hue, saturation, brightness);

	terrain = new Terrain(start, end, roughness, verticalDisplacement, tint);
	return terrain;
}

function mouseReleased() {
	redraw();

	// save("image.jpg");
}
