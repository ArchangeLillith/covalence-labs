const path = require("path");
const fs = require("fs");

const chirpFile = path.join(__dirname, "/chirps.json");

const chirps = [
	"this is a chirp",
	"here a chirp",
	"there a chirp",
	"we get the point",
];

fs.writeFile(chirpFile, JSON.stringify(chirps), (err) => {
	if (err) {
		console.log(err);
	}
});

fs.readFile(chirpFile, "utf8", (err, data) => {
	if (err) console.log(err);
	else console.log(data);
});
