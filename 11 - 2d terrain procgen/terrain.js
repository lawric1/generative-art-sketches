class Terrain {
	constructor(start, end, roughness, verticalDisplacement, tint) {
		this.start = start || createVector(0, height / 2);
		this.end = end || createVector(width, height / 2);
		this.roughness = roughness || 1;
		this.verticalDisplacement = verticalDisplacement || (this.start.y + this.end.y) / 2;
		this.tint = tint || color(255);
	}

	show() {
		let displacementMap = this.midpointDisplacement();

		stroke(this.tint);
		strokeWeight(2);
		for (let i = 0; i < displacementMap.length; i++) {
			point = displacementMap[i];
			line(point.x, point.y, point.x, height + 1);
		}
	}

	midpointDisplacement() {
		let verticalDisplacement = this.verticalDisplacement;

		let points = [this.start, this.end];

		let iteration = 1;
		let maxIterations = 9;

		while (iteration <= maxIterations) {
			let segments = [...points];
			let possibleDisplacements = [-verticalDisplacement, verticalDisplacement];

			for (let i = 0; i < segments.length - 1; i++) {
				let beginSegment = segments[i];
				let endSegment = segments[i + 1];
				let midpoint = createVector(0, 0);
				midpoint.x = (beginSegment.x + endSegment.x) / 2;
				midpoint.y = (beginSegment.y + endSegment.y) / 2;

				let d = random(possibleDisplacements);
				// print(d);
				midpoint.y += d;

				points.push(midpoint);
				points.sort(this.compareVectors);
			}

			verticalDisplacement *= pow(2, -this.roughness);
			iteration += 1;
		}

		return points;
	}

	// Will be used to sort vector array.
	compareVectors(a, b) {
		return a.x - b.x || a.y - b.y || a.z - b.z;
	}

	// Picks random value from array.
	choice(array) {
		return array[floor(random() * array.length)];
	}
}
