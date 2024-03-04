const path = require("path");
const fs = require("fs");

const chirpFile = path.join(__dirname, "/chirps.json");

const chirps = [
	{
		chirp: "this is a chirp",
		chirp: "here a chirp",
		chirp: "there a chirp",
		chirp: "we get the point",
	},
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
