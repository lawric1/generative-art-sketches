// Initialize boids and UI elements
function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(20);
	stroke(255);

	// quadraticKochIsland();
	fractalPlant();
}

function quadraticKochIsland() {
	translate(100, 100);

	let angle = radians(90);

	let system = {
		axiom: "f+f+f+f",
		rules: { f: "f+f-f-ff+f+f-f" },
		constants: ["+", "-"],
	};

	let axiom = generateLSystem(system, 3);

	for (let letter of axiom) {
		switch (letter) {
			case "f":
				line(0, 0, 3, 0);
				translate(3, 0);
				break;
			case "+":
				rotate(angle);
				break;
			case "-":
				rotate(-angle);
				break;
			default:
				break;
		}
	}
}

function fractalPlant() {
	translate(width / 2, height);
	let angle = radians(20);

	let system = {
		axiom: "x",
		rules: { f: "f[+f[-f]]f[-f[+f]]f", x: "f[-x][x]f[+x]-x" },
		constants: ["+", "-", "[", "]"],
	};

	let axiom = generateLSystem(system, 4);

	for (let letter of axiom) {
		switch (letter) {
			case "f":
				line(0, 0, 0, -5);
				translate(0, -5);
				break;
			case "+":
				rotate(angle);
				break;
			case "-":
				rotate(-angle);
				break;
			case "[":
				push();
				break;
			case "]":
				pop();
				break;
			default:
				break;
		}
	}
}

function generateLSystem(system, iterations) {
	let axiom = system.axiom;
	let nextAxiom = "";

	for (let i = 0; i < iterations; i++) {
		for (let variable of axiom) {
			if (system.constants.includes(variable)) {
				nextAxiom += variable;
			} else {
				nextAxiom += system.rules[variable];
			}
		}

		axiom = nextAxiom;
		nextAxiom = "";
	}

	return axiom;
}

function keyPressed() {
	if (key === "g") {
		saveGif("mySketch", 5);
	}

	if (key === "s") {
		save("image.jpg");
	}
}
