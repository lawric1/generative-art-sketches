function heighwayDragon(iterations, len) {
	// line(0, 0, 0, len);
	let commands = ["F"];

	for (let i = 0; i < iterations; i++) {
		commands = DragonNextCommands(commands);
	}

	commands.forEach((command) => {
		switch (command) {
			case "F":
				line(0, 0, 0, -len);

				break;
			case "G":
				line(0, 0, 0, -len);

				break;
			case "+":
				translate(0, -len);
				rotate(radians(-90));

				break;
			case "-":
				translate(0, -len);
				rotate(radians(90));

				break;
		}
	});
}

function DragonNextCommands(commands) {
	let nextCommands = [];

	for (const command of commands) {
		switch (command) {
			case "F":
				nextCommands.push("F");
				nextCommands.push("+");
				nextCommands.push("G");
				break;
			case "G":
				nextCommands.push("F");
				nextCommands.push("-");
				nextCommands.push("G");
				break;
			default:
				nextCommands.push(command);
				break;
		}
	}

	return nextCommands;
}
