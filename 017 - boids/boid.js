class Boid {
	constructor(position) {
		this.position = position;
		this.velocity = p5.Vector.random2D();
		this.velocity.setMag(10, 10);
		this.acceleration = createVector();
		this.maxSpeed = 5;

		this.vision = 75; // the vision range of the boid
		this.cohesionFactor = 0.01;
		this.separationFactor = 0.01;
		this.alignmentFactor = 0.5;
	}

	// Calculate the forces acting on the boid
	flock(boids, obstacles) {
		let force = createVector();
		force.add(this.cohesion(boids));
		force.add(this.separation(boids));
		force.add(this.alignment(boids));
		force.add(this.avoidObstacles(obstacles));

		this.acceleration = force;
	}

	cohesion(boids) {
		let steering = createVector();
		let boidsInRange = 0;

		for (let other of boids) {
			let distance = p5.Vector.dist(this.position, other.position);

			if (this == other) {
				continue;
			}

			if (distance < this.vision) {
				steering.add(other.position);
				boidsInRange++;
			}
		}

		if (boidsInRange > 0) {
			steering.div(boidsInRange); // Avarage velocity
			steering.sub(this.position); // Vector to desired position
			steering.mult(this.cohesionFactor); // This will control how fast the boids will go towards desired position
		}

		return steering;
	}

	separation(boids) {
		let steering = createVector();

		for (let other of boids) {
			let distance = p5.Vector.dist(this.position, other.position);

			if (this == other) {
				continue;
			}

			if (distance < this.vision) {
				let oppositeDirection = p5.Vector.sub(this.position, other.position);
				oppositeDirection.div(distance);

				steering.add(oppositeDirection);
			}
		}

		steering.mult(this.separationFactor); // This will control how fast the boids will avoid each other

		return steering;
	}

	alignment(boids) {
		let steering = createVector();
		let boidsInRange = 0;

		for (let other of boids) {
			let distance = p5.Vector.dist(this.position, other.position);

			if (this == other) {
				continue;
			}

			if (distance < this.vision) {
				steering.add(other.velocity);
				boidsInRange++;
			}
		}

		if (boidsInRange > 0) {
			steering.div(boidsInRange); // Avarage velocity
			steering.mult(this.maxSpeed);
			steering.sub(this.velocity); // Steering direction
			steering.mult(this.alignmentFactor); // This will control how well the boids can align with each other
		}

		return steering;
	}

	avoidObstacles(obstacles) {
		let steering = createVector();

		for (let obstacle of obstacles) {
			let distance = p5.Vector.dist(this.position, obstacle.position);

			if (distance < obstacle.size + 10) {
				let oppositeDirection = p5.Vector.sub(this.position, obstacle.position);
				steering.add(oppositeDirection);
			}
		}

		steering.limit(this.maxSpeed); // Control how fast the boids will avoid the obstacle

		return steering;
	}

	handleEdges() {
		const offset = 5;
		let turn = 1;

		if (this.position.x > width) this.position.x = offset;
		if (this.position.x < 0) this.position.x = width - offset;
		if (this.position.y > height) this.position.y = offset;
		if (this.position.y < 0) this.position.y = height - offset;

		// if (this.position.x > width - offset) this.velocity.x -= turn;
		// if (this.position.x < offset) this.velocity.x += turn;
		// if (this.position.y > height - offset) this.velocity.y -= offset;
		// if (this.position.y < offset) this.velocity.y += offset;
	}

	update() {
		this.vision = visionSlider.value();
		this.cohesionFactor = cohesionSlider.value();
		this.separationFactor = separationSlider.value();
		this.alignmentFactor = alignmentSlider.value();

		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.velocity.limit(this.maxSpeed);

		// Reset acceleration
		this.acceleration.set(0);

		this.handleEdges();
	}

	show() {
		circle(this.position.x, this.position.y, 5);
	}
}
