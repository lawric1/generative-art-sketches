class Particle {
	constructor() {
		this.position = createVector(random(width), random(height));
		this.velocity = createVector(0, 0);
		this.acceleration = createVector(0, 0);
		this.maxSpeed = random(4, 8);
	}

	update() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.position.add(this.velocity);
		//Reset acceleration each update
		this.acceleration.mult(0);
	}

	follow(flowField) {
		// Find the nearest vector in the flowfield based on the current particle position
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
		// If particle reach edges make it loop around
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

	handleRange(influencePoints) {
		// if particle gets too close to the  linfluence points,
		// reset its position
		for (let i = 0; i < influencePoints.length; i++) {
			let point = influencePoints[i];
			let distance = dist(this.position.x, this.position.y, point.x, point.y);

			if (distance < random(50)) {
				this.position = createVector(random(width), random(height));
			}
		}
	}
}
