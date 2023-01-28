let particles = [];
let springs = [];
let cols = 10;
let rows = 10;
let startX = 100;
let startY = 50;
let spacing = 30;

function setup() {
	createCanvas(600, 600);

	p1 = new Particle(createVector(180, 50), 20, true);
	p2 = new Particle(createVector(220, 50), 20, false);
	p3 = new Particle(createVector(260, 50), 20, false);
	p4 = new Particle(createVector(300, 50), 20, false);

	s1 = new Spring(p1, p2, 60);
	s2 = new Spring(p2, p3, 60);
	s3 = new Spring(p3, p4, 60);

	for (let i = 0; i < cols; i++) {
		particles[i] = [];
		for (let j = 0; j < rows; j++) {
			x = startX + i * spacing;
			y = startY + j * spacing;
			addPoint(x, y, i, j);
		}
	}

	particles[0][0].pinned = true;
	particles[cols - 1][0].pinned = true;

	for (let i = 0; i < cols - 1; i++) {
		for (let j = 0; j < rows - 1; j++) {
			p1 = particles[i][j];
			p2 = particles[i + 1][j];
			p3 = particles[i][j + 1];

			addSpring(p1, p2);
			addSpring(p1, p3);
		}
	}

	createLoop({ duration: 3, gif: true });
}

function draw() {
	background(0);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			particles[i][j].update(deltaTime / 60);
			// particles[i][j].show();
		}
	}

	for (let spring of springs) {
		spring.update();
		spring.show();
	}

	// p1.update(deltaTime / 60);
	// p2.update(deltaTime / 60);
	// p3.update(deltaTime / 60);
	// p4.update(deltaTime / 60);

	// p1.show();
	// p4.show();

	// s1.update();
	// s2.update();
	// s3.update();

	// s1.show();
	// s2.show();
	// s3.show();
}

function addPoint(x, y, i, j) {
	let particle = new Particle(createVector(x, y), 1000, false);
	particles[i][j] = particle;
}

function addSpring(point1, point2) {
	s = new Spring(point1, point2, spacing);
	springs.push(s);
}
// function mouseClicked() {
// 	save("image.jpg");
// }
