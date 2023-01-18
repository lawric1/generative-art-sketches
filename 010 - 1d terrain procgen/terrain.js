class Terrain {
	constructor(start, end, roughness, verticalDisplacement, tint) {
		this.start = start || createVector(0, height / 2);
		this.end = end || createVector(width, height / 2);
		this.roughness = roughness || 1;
		this.verticalDisplacement = verticalDisplacement || (this.start.y + this.end.y) / 2;
		this.tint = tint || color(255);
	}

	show() {
		let displacementMap = this.generateDisplacementMap();

		stroke(this.tint);
		strokeWeight(2);

		// Draw terrain by drawing a line from each point to the bottom of screen;
		for (let i = 0; i < displacementMap.length; i++) {
			point = displacementMap[i];
			line(point.x, point.y, point.x, height + 1);
		}
	}

	// Use midpoint displacement algorithm to generate all points in terrain;
	generateDisplacementMap() {
		let verticalDisplacement = this.verticalDisplacement;

		let points = [this.start, this.end];

		let iteration = 1;
		let maxIterations = 9;

		while (iteration <= maxIterations) {
			let segments = [...points];
			let possibleDisplacements = [-verticalDisplacement, verticalDisplacement];

			// Will get each segment in the points array and add new point in between them;
			for (let i = 0; i < segments.length - 1; i++) {
				let beginSegment = segments[i];
				let endSegment = segments[i + 1];
				let midpoint = createVector(0, 0);

				midpoint.x = (beginSegment.x + endSegment.x) / 2;
				midpoint.y = (beginSegment.y + endSegment.y) / 2;

				// Random will choose between itens in array;
				let displacementValue = random(possibleDisplacements);
				midpoint.y += displacementValue;

				points.push(midpoint);

				// Sort vectors based on the x coordinate;
				points.sort(this.compareVectors);
			}

			verticalDisplacement *= pow(2, -this.roughness);
			iteration += 1;
		}

		return points;
	}

	// Will be used to sort vector array;
	compareVectors(a, b) {
		return a.x - b.x || a.y - b.y || a.z - b.z;
	}
}
