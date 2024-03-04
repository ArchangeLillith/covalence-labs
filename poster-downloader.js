const path = require("path");
const fs = require("fs");
const https = require("https");
const axios = require("axios");

const file = fs.createWriteStream("file.jpg");

//Could be funky ordering. If ordering matters, pass in an array and await each thing. This way is more performant
async function writeBanner(urls) {
	for (let url of urls) {
		const downloadFolder = path.join(
			__dirname,
			"/downloads",
			`${url.title}.jpg`
		);
		const writer = fs.createWriteStream(downloadFolder);

		const bannerUrl = url.url;
		const response = await axios({
			url: bannerUrl,
			method: "GET",
			responseType: "stream",
			httpsAgent: new https.Agent({ keepAlive: true }),
		});

		response.data.pipe(writer);

		return new Promise((resolve, reject) => {
			writer.on("finish", resolve);
			writer.on("reject", reject);
		});
	}
}

fetch("https://api-ghibli.herokuapp.com/films")
	.then((res) => res.json())
	.then((data, err) => {
		if (err) {
			console.log(err);
		}
		const urls = [];
		data.forEach((film) => {
			urls.push({ url: film.movie_banner, title: film.title });
		});
		writeBanner(urls);
	});
