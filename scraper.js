const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.imdb.com/find?q=';
const urlMovie = 'https://www.imdb.com/title/';

function searchMovies(searchTerm) {
	return fetch(`${url}${searchTerm}`)
	.then(response => response.text())
	.then(body => {
		const movies = [];
		const $ = cheerio.load(body);

		$('.findResult').each(function(index, element) {
			const $element = $(element);
			const $image = $element.find('td a img');
			const $title = $element.find('td.result_text a');

			const movie = {
				image: $image.attr('src'),
				title: $title.text()
			};
			movies.push(movie);
		});

		return movies;
	});
}

function getMovie(imdbID) {
	return fetch(`${urlMovie}${imdbID}`)
	.then(response => response.text())
	.then(body => {

		const $ = cheerio.load(body);

		const genres = [];
		const stars = [];

		const $title = $('.title_wrapper h1');
		const $poster = $('.poster a img');
		const $summary = $('.summary_text');
		const $rating = $('.ratingValue strong span');

		$('.subtext a').each(function(index, element) {
			const genre = $(element).text();
			genres.push(genre);
		});

		$('.credit_summary_item a').each((index, element) => {
			const star = $(element).text();
			stars.push(star);
		});

		return {
			title: $title.text().trim(),
			poster: $poster.attr('src'),
			summary: $summary.text().trim(),
			rating: $rating.text(),
			genres,
			stars
		};
	});
}

module.exports = {
	searchMovies,
	getMovie
};
