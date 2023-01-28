class Particle {
	constructor(pos, mass, pinned) {
		this.position = pos;
		this.lastPosition = pos.copy();
		this.velocity = createVector(0, 0);
		this.acceleration = createVector(0, 0);
		this.mass = mass;
		this.pinned = pinned;

		this.frictionCoefficient = 0.99;
		this.bounciness = 0.5;
	}

	applyForce(force) {
		this.acceleration.add(force);
	}

	keepInsideView() {
		if (this.position.x > width) {
			this.position.x = width;
			this.lastPosition.x = this.position.x + this.velocity.x * this.bounciness;
		}
		if (this.position.x < 0) {
			this.position.x = 0;
			this.lastPosition.x = this.position.x + this.velocity.x * this.bounciness;
		}
		if (this.position.y > height) {
			this.position.y = height;
			this.lastPosition.y = this.position.y + this.velocity.y * this.bounciness;
		}
		if (this.position.y < 0) {
			this.position.y = 0;
			this.lastPosition.y = this.position.y + this.velocity.y * this.bounciness;
		}
	}

	update(deltaTime) {
		if (this.pinned) {
			this.lastPos = this.position.copy();
			return;
		}

		this.keepInsideView();

		let gravity = createVector(0, 1);
		this.applyForce(gravity);

		this.velocity = this.position.copy().sub(this.lastPosition);
		this.velocity.mult(this.frictionCoefficient); // apply friction

		this.lastPosition = this.position.copy();

		// Verlet Integration;
		let acc = this.acceleration.mult(deltaTime);
		this.position.add(this.velocity).add(acc);

		//Reset acceleration each update
		this.acceleration.set(0, 0);
	}

	show() {
		circle(this.position.x, this.position.y, 10);
	}
}

class Spring {
	constructor(p1, p2, restLength) {
		this.particle1 = p1;
		this.particle2 = p2;
		this.restLength = restLength;
		this.stiffness = 0.5;
	}

	update() {
		let direction = p5.Vector.sub(this.particle1.position, this.particle2.position);
		let distance = direction.mag();
		direction.normalize();

		let stretch = this.restLength - distance;
		let force = direction.mult(stretch).mult(this.stiffness);

		if (!this.particle1.pinned) {
			this.particle1.position.add(force);
		}

		if (!this.particle2.pinned) {
			this.particle2.position.sub(force);
		}
	}

	show() {
		stroke(255);
		line(
			this.particle1.position.x,
			this.particle1.position.y,
			this.particle2.position.x,
			this.particle2.position.y
		);
	}
}
