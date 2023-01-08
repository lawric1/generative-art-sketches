class Raindrop {
	constructor() {
		this.x = random(width);
		this.y = random(-100, height);
		this.speed = random(20, 30);
		this.length = random(10, 20);

		// Depth will define the color of the raindrop.
		this.depth = map(this.speed, 20, 30, 50, 255);

		this.isRipple = false;
		this.rippleX = this.x;
		this.rippleY = this.y;
		this.rippleRadius = random(30, 40);
		this.maxRadius = 60;
	}

	show() {
		// Draw ripple.
		if (this.isRipple) {
			fill(0, 0, 0, 125);
			ellipse(this.rippleX, this.rippleY, this.rippleRadius, this.rippleRadius - 20);
		}

		// Draw raindrop.
		ellipse(this.x, this.y, 2, this.length);
	}

	update() {
		// Ripple is being drawn, don't update raindrop position.
		if (this.isRipple) {
			this.rippleRadius += 4;

			if (this.rippleRadius > this.maxRadius) {
				this.isRipple = false;
				// Reset radius.
				this.rippleRadius = random(30, 40);
			}

			return;
		}

		this.x += random(-10, 10);
		this.y += this.speed;

		// If raindrop reaches bottom, enable ripple and reset position.
		if (this.y > height - random(200)) {
			this.isRipple = true;
			this.rippleX = this.x;
			this.rippleY = this.y;

			this.x = random(width);
			this.y = random(-100, -10);
		}
	}
}
