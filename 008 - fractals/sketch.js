function setup() {
	createCanvas(600, 600);

	showFractalTreeGUI();

	noLoop();
}

function draw() {
	background(0);
	stroke(255);
	fill(0);

	// ----------  Fractal tree.  ----------
	translate(width / 2, height);
	updateFractalTreeValues();
	branch(200);

	// ----------  Sierpinski Gasket.  ----------
	// translate(width / 2, height / 2);
	// push();
	// fill(255);
	// rotate(PI);
	// drawEquilateralTriangle(240);
	// pop();
	// sierpinskiGasket(240);

	// ----------  Sierpinski Carpet.  ----------
	// translate(width / 2, height / 2);
	// rectMode(RADIUS);
	// fill(255);
	// square(0, 0, 180);
	// sierpinskiCarpet(180);

	// ----------  Heighway Dragon.  ----------
	// translate(width / 3, height / 2);
	// heighwayDragon(14, 2);
}

// function mouseClicked() {
// 	save("image.jpg");
// }
