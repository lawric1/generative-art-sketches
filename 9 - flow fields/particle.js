class Particle {
	constructor() {
		this.position = createVector(random(width), random(height));
		this.velocity = createVector(0, 0);
		this.acceleration = createVector(0, 0);
		this.maxSpeed = random(4, 8);
		this.lifeSpam = 100;
	}

	update() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.position.add(this.velocity);
		this.acceleration.mult(0); //Reset acceleration each update

		this.lifeSpam -= 1;

		if (this.lifeSpam <= 0) {
			this.position = createVector(random(width), random(height));
			this.lifeSpam = 200;
		}
	}

	follow(flowField) {
		let x = floor(this.position.x / tileSize);
		let y = floor(this.position.y / tileSize);
		let index = x + y * cols;
		let force = flowField[index];
		this.applyForce(force);
	}

	applyForce(force) {
		this.acceleration.add(force);
	}

	show() {
		strokeWeight(4);
		point(this.position.x, this.position.y);
	}

	handleEdges() {
		if (this.position.x > width) {
			this.position.x = 0;
		}
		if (this.position.x < 0) {
			this.position.x = width;
		}
		if (this.position.y > height) {
			this.position.y = 0;
		}
		if (this.position.y < 0) {
			this.position.y = height;
		}
	}

	handleRange(targets) {
		for (let i = 0; i < targets.length; i++) {
			let target = targets[i];
			let distance = dist(this.position.x, this.position.y, target.x, target.y);

			if (distance < 10) {
				this.position = createVector(random(width), random(height));
				this.lifeSpam = 200;
			}
		}
	}
}
