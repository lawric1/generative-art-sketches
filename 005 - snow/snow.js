class Snow {
	constructor() {
		this.x = random(-width, width);
		this.y = random(height);
		this.gravity = random(5, 10);
		this.windVelocity = random(5, 20);
		this.maxAcceleration = random(15, 30);

		// Depth will be used for the color.
		// and its based on the initial speed.
		this.depth = map(this.gravity, 5, 10, 150, 200);

		// Stretch the snow the faster it gets.
		this.radius = map(this.windVelocity, 5, 20, 8, 2);

		// Noise factor.
		this.xOff = random(10);
	}

	show() {
		ellipse(this.x, this.y, this.radius, this.radius);
	}

	update() {
		// Noise will give a controlled randomness for the acceleration.
		this.x += noise(this.xOff) * this.windVelocity;
		this.y += this.gravity;
		this.windVelocity += random(0.01, 0.1);

		if (this.windVelocity > this.maxAcceleration) {
			this.windVelocity = random(5, 20);
		}

		// Snow if out of screen, reset all parameters.
		if (this.y > height) {
			this.x = random(-width, width);
			this.y = random(-100, -10);
			this.gravity = random(5, 10);
			this.windVelocity = random(5, 20);
			this.maxAcceleration = random(15, 30);
			this.depth = map(this.gravity, 5, 10, 50, 250);
			this.radius = map(this.windVelocity, 5, 20, 8, 2);
			this.xOff = random(10);
		}
	}
}
