const path = require("path");
const fs = require("fs");

const filmsFile = path.join(__dirname, "./films.json");

const filmArray = [];
fetch("https://api-ghibli.herokuapp.com/films")
	.then((res) => res.json())
	.then((data) => {
		data.forEach((film) => {
			let movie = [];
			movie.push(film.id);
			movie.push(film.title);
			movie.push(film.description);
			movie.push(film.rt_score);
			filmArray.push(movie);
			movie = [];
		});
		console.log(filmArray);
		fs.writeFile(filmsFile, JSON.stringify(filmArray), (err) => {
			if (err) console.log(err);
		});
	});
