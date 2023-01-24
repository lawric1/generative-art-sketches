let asciiPalette = [
	"@",
	"#",
	"$",
	"%",
	"&",
	"S",
	"s",
	"o",
	"O",
	"0",
	"Q",
	"D",
	"d",
	"C",
	"c",
	"Z",
	"z",
	"x",
	"X",
	"v",
	"V",
	">",
	"<",
	"+",
	"-",
	"=",
	"^",
	"~",
	"*",
	".",
	",",
	";",
	":",
	" ",
];

function preload() {
	img = loadImage("./image.jpg");
	// img = loadImage("./image2.jpg");
	// img = loadImage("./image3.jpg");
}

function setup() {
	createCanvas(img.width, img.height);

	background(0);

	let tiles = 60;
	let tileWidth = width / tiles;
	let tileHeight = height / tiles;

	textSize(tileWidth, tileHeight);

	for (let row = 0; row < tiles; row++) {
		for (let col = 0; col < tiles; col++) {
			let x = col * tileWidth;
			let y = row * tileHeight;

			let pixelColor = img.get(x, y);

			// Sum RGB values and divide by 3 to get pixel luminance
			let luma = (pixelColor[0] + pixelColor[1] + pixelColor[2]) / 3;

			// Map luminance value to palette length to get the color index;
			let index = floor(map(luma, 0, 255, 0, asciiPalette.length - 1));

			// Ascii palette is sorted from big to small
			// invert index so darker colors use smaller ascii characters
			index = asciiPalette.length - index;
			let ascii = asciiPalette[index];

			// Greyscale mode
			// fill(luma);
			// stroke(luma);

			// Color mode
			fill(pixelColor);
			stroke(pixelColor);

			text(ascii, x, y);
		}
	}
}

// function mouseClicked() {
// 	save("image.jpg");
// }
