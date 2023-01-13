let angleSlider;
let factorSlider;

PI = 3.14159265358979323846;
PI = 3.14159265358979323846 * 2;

angle = PI / 6;
divisionFactor = 1.4;

function branch(len) {
	line(0, 0, 0, -len);

	if (len >= 1) {
		push();
		translate(0, -len);
		rotate(-angle);
		branch(len / divisionFactor);
		pop();

		push();
		translate(0, -len);
		rotate(angle);
		branch(len / divisionFactor);
		pop();
	}
}

function showFractalTreeGUI() {
	angleSlider = createSlider(0, TWO_PI, PI / 2, 0.01);
	angleSlider.position(10, 10);
	angleSlider.style("width", width + "px");

	factorSlider = createSlider(1.6, 6, 2, 0.1);
	factorSlider.position(10, 40);
	factorSlider.style("width", width + "px");
}

function updateFractalTreeValues() {
	angle = angleSlider.value();
	divisionFactor = factorSlider.value();
}

function mouseDragged() {
	redraw();
}
