const express = require('express');

const scraper = require('./scraper.js');

const app = express();

app.get('/', (req, res) => {
	res.json({
		message: 'Scrapping'
	});
})

app.get('/search/:title', (req, res) => {
	scraper.searchMovies(req.params.title)
	.then(movies => res.json(movies));
});

app.get('/movie/:imdbID', (req, res) => {
	scraper.getMovie(req.params.imdbID)
	.then(movie => {
		res.json(movie);
	});
});

const port = 3000;

app.listen(port, () => {
	console.log(`working port ${port}`);
});
