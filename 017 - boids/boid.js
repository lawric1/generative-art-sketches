class Boid {
	constructor(position) {
		this.position = position;
		this.velocity = p5.Vector.random2D();
		this.velocity.setMag(5, 5);
		this.acceleration = createVector();
		this.maxSpeed = 5;

		this.vision = 100; // the vision range of the boid
		this.cohesionFactor = 0.5;
		this.separationFactor = 0.5;
		this.alignmentFactor = 0.3;
	}

	// Calculate the forces acting on the boid
	flock(boids, obstacles) {
		let force = createVector();
		force.add(this.alignment(boids));
		force.add(this.separation(boids));
		force.add(this.cohesion(boids));
		force.add(this.avoidObstacles(obstacles));

		this.acceleration = force;
	}

	cohesion(boids) {
		let steering = createVector();
		let boidsInRange = 0;

		for (let i = 0; i < boids.length; i++) {
			let distance = p5.Vector.dist(this.position, boids[i].position);

			if (this != boids[i] && distance < this.vision) {
				steering.add(boids[i].position);
				boidsInRange++;
			}
		}

		if (boidsInRange > 0) {
			steering.div(boidsInRange); // Avarage velocity
			steering.sub(this.position); // Vector to desired position
			steering.setMag(this.maxSpeed); // Set magnitude so boids don't slow down
			steering.sub(this.velocity); // Steering direction
			steering.limit(this.cohesionFactor); // This will control how fast the boids will go towards each other
		}

		return steering;
	}

	separation(boids) {
		let steering = createVector();
		let boidsInRange = 0;

		for (let i = 0; i < boids.length; i++) {
			let distance = p5.Vector.dist(this.position, boids[i].position);

			if (this != boids[i] && distance < this.vision) {
				let oppositeDirection = p5.Vector.sub(this.position, boids[i].position);
				oppositeDirection.div(distance);

				steering.add(oppositeDirection);
				boidsInRange++;
			}
		}

		if (boidsInRange > 0) {
			steering.div(boidsInRange); // Avarage velocity
			steering.setMag(this.maxSpeed); // Set magnitude so boids don't slow down
			steering.sub(this.velocity); // Steering direction
			steering.limit(this.separationFactor); // This will control how fast the boids will avoid each other
		}

		return steering;
	}

	alignment(boids) {
		let steering = createVector();
		let boidsInRange = 0;

		for (let i = 0; i < boids.length; i++) {
			let distance = p5.Vector.dist(this.position, boids[i].position);

			if (this != boids[i] && distance < this.vision) {
				steering.add(boids[i].velocity);
				boidsInRange++;
			}
		}

		if (boidsInRange > 0) {
			steering.div(boidsInRange); // Avarage velocity
			steering.setMag(this.maxSpeed); // Set magnitude so boids don't slow down
			steering.sub(this.velocity); // Steering direction
			steering.limit(this.alignmentFactor); // This will control how well the boids can align with each other
		}

		return steering;
	}

	avoidObstacles(obstacles) {
		let steering = createVector();
		let obstaclesInRange = 0;

		for (let i = 0; i < obstacles.length; i++) {
			let distance = p5.Vector.dist(this.position, obstacles[i].position);

			if (distance < obstacles[i].size) {
				let oppositeDirection = p5.Vector.sub(this.position, obstacles[i].position);
				steering.add(oppositeDirection);

				obstaclesInRange++;
			}
		}

		if (obstaclesInRange > 0) {
			steering.div(obstaclesInRange); // Avarage velocity
			steering.sub(this.velocity); // Steering direction
			steering.limit(this.maxSpeed); // Control how fast the boids will avoid the obstacle
		}

		return steering;
	}

	handleEdges() {
		const offset = 5;
		if (this.position.x > width) this.position.x = offset;
		if (this.position.x < 0) this.position.x = width - offset;
		if (this.position.y > height) this.position.y = offset;
		if (this.position.y < 0) this.position.y = height - offset;
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
