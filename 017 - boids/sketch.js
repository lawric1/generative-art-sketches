let boids = [];
let obstacles = [];

let visionSlider; // Slider to adjust boids' vision range
let cohesionSlider; // Slider to adjust boids' cohesion behavior
let separationSlider; // Slider to adjust boids' separation behavior
let alignmentSlider; // Slider to adjust boids' alignment behavior

let startX, startY, endX, endY; // Variables to store start and end positions of mouse clicks

// Initialize boids and UI elements
function setup() {
	createCanvas(400, 400);

	initializeUI();

	for (let i = 0; i < 200; i++) {
		let position = createVector(random(width), random(height));
		boids.push(new Boid(position));
	}
}

function draw() {
	background(0, 100); // Clear canvas with transparent gray background

	// Update and display each boid
	for (let i = 0; i < 50; i++) {
		boids[i].flock(boids, obstacles);
		boids[i].update();
		boids[i].show();
	}

	// Display obstacles
	for (const obstacle of obstacles) {
		push();
		fill(0);
		stroke(255);
		circle(obstacle.position.x, obstacle.position.y, obstacle.size * 2);
		pop();
	}
}

// Function to create UI elements (sliders)
function initializeUI() {
	visionSlider = createSlider(0, 100, 100, 5);
	visionSlider.position(0, height);
	visionSlider.style("width", "400px");

	cohesionSlider = createSlider(0, 1, 0.5, 0.1);
	cohesionSlider.position(0, height + 20);
	cohesionSlider.style("width", "400px");

	separationSlider = createSlider(0, 1, 0.5, 0.1);
	separationSlider.position(0, height + 40);
	separationSlider.style("width", "400px");

	alignmentSlider = createSlider(0, 1, 0.3, 0.1);
	alignmentSlider.position(0, height + 60);
	alignmentSlider.style("width", "400px");
}

// Mouse events to create obstacles based on mouse drag
function mousePressed() {
	startX = mouseX;
	startY = mouseY;
}

function mouseReleased() {
	endX = mouseX;
	endY = mouseY;

	if (0 < startX < width) {
		let obstacleSize = dist(startX, startY, endX, endY);
		obstacleSize = constrain(obstacleSize, 30, 60);

		obstacles.push({ position: createVector(startX, startY), size: obstacleSize });
	}
}

function keyPressed() {
	if (key === "g") {
		saveGif("mySketch", 5);
	}

	if (key === "s") {
		save("image.jpg");
	}
}
