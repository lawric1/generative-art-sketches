class Cell {
	constructor(x, y, radius, xOff, yOff, speed) {
		this.x = x;
		this.y = y;
		this.radius = radius || 40;
		this.xOff = xOff || random(100);
		this.yOff = yOff || random(200);
		this.speed = speed || 0.002;

		this.steps = 0;
		this.maxSteps = random(100, 400);
		this.done = false;
	}

	show() {
		circle(this.x, this.y, this.radius);
	}

	update() {
		this.x = noise(this.xOff);
		this.y = noise(this.yOff);

		this.xOff += this.speed;
		this.yOff += this.speed;

		// Constrain x and y to screen dimensions.
		this.x = map(this.x, 0, 1, 0, width);
		this.y = map(this.y, 0, 1, 0, height);

		this.steps += 1;

		this.done = this.steps >= this.maxSteps;
	}
}
