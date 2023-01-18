function sierpinskiGasket(radius) {
	drawEquilateralTriangle(radius / 2);

	if (radius >= 4) {
		push();
		translate(0, -radius / 2);
		sierpinskiGasket(radius / 2);
		pop();

		push();
		translate(radius / 2.3, radius / 4);
		sierpinskiGasket(radius / 2);
		pop();

		push();
		translate(-radius / 2.3, radius / 4);
		sierpinskiGasket(radius / 2);
		pop();
	}
}

function drawEquilateralTriangle(radius) {
	push();
	rotate(PI / 2);

	angle1 = 0;
	angle2 = (1 / 3) * TWO_PI;
	angle3 = (2 / 3) * TWO_PI;

	x1 = radius * cos(angle1);
	y1 = radius * sin(angle1);

	x2 = radius * cos(angle2);
	y2 = radius * sin(angle2);

	x3 = radius * cos(angle3);
	y3 = radius * sin(angle3);

	triangle(x1, y1, x2, y2, x3, y3);
	pop();
}
