class Body {
	constructor(pos, vel, mass) {
		this.position = pos;
		this.velocity = vel;
		this.acceleration = createVector(0, 0);
		this.mass = mass;

		this.size = sqrt(this.mass) * 4;
	}

	applyForce(force) {
		let acc = p5.Vector.div(force, this.mass);
		this.acceleration.add(acc);
	}

	attract(body) {
		// Apply newton's law of universal gravitation to find force;
		let direction = p5.Vector.sub(this.position, body.position);
		let distanceSq = constrain(direction.magSq(), 100, 1000);
		let gravConstant = 1;
		let strength = (gravConstant * (this.mass * body.mass)) / distanceSq;
		direction.setMag(strength);

		body.applyForce(direction);
	}

	update() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		//Reset acceleration each update
		this.acceleration.set(0, 0);
	}

	show() {
		circle(this.position.x, this.position.y, this.size);
	}
}
