let bodies = [];
let sun;

function setup() {
	createCanvas(600, 600);

	for (let i = 0; i < 5; i++) {
		let pos = p5.Vector.random2D();
		let vel = pos.copy();
		vel.setMag(random(5, 10));
		pos.setMag(random(100, 250));
		vel.rotate(PI / 2);
		let mass = random(5, 35);

		bodies.push(new Body(pos, vel, mass));
	}

	sun = new Body(createVector(0, 0), createVector(0, 0), 500);

	// createLoop({ duration: 3, gif: true });
}

function draw() {
	background(0, 60);
	translate(width / 2, height / 2);

	for (let body of bodies) {
		sun.attract(body);
		for (let other of bodies) {
			if (body !== other) {
				body.attract(other);
			}
		}
	}

	for (let body of bodies) {
		body.update();
		body.show();
	}
}

// function mouseClicked() {
// 	save("image.jpg");
// }
