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
		//Reset acceleration each update
		this.acceleration.mult(0);

		this.lifeSpam -= 1;

		// Prevents particle from circling the points for too long
		if (this.lifeSpam <= 0) {
			this.position = createVector(random(width), random(height));
			this.lifeSpam = 200;
		}
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

	handleRange(attractorPoints) {
		// if particle gets too close to the attraction points,
		// reset its position and lifetime
		for (let i = 0; i < attractorPoints.length; i++) {
			let attractor = attractorPoints[i];
			let distance = dist(this.position.x, this.position.y, attractor.x, attractor.y);

			if (distance < 10) {
				this.position = createVector(random(width), random(height));
				this.lifeSpam = 200;
			}
		}
	}
}
