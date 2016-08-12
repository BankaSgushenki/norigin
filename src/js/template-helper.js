'use strict';

export default class TemplateHelper {
	constructor() {
		let htmlToElement = function(html) {
    		let template = document.createElement('template');
    		template.innerHTML = html;
    		return template.content.firstChild;
		}

		let movieInfoHTML= '<div><h3 class = "movie-title"></h3><h3 class = "movie-year"></h3><div class = "actors">Actors: </div><div class = "directors">Directors: </div></div>';
		let movieListItemHTML = '<li><img class = "movie-cover" src=""><p class = "movie-title"></p><p class = "movie-year"></p></li>';
		let movieInfoElement = htmlToElement(movieInfoHTML);

		this.getMovieInfoTemplate = function() {
			return movieInfoElement;
		}

		/**
		 * returns array of 'source' elements with src and type attributes
		 * @param {Array} streams
		 * @return {Array} 'source' elements
		 */
		this.createPlayerSource = function(streams) {
			let sources = [];
			streams.forEach(function(stream) {
				let source = document.createElement('source');
				source.src = stream.url;
				source.type = 'video/' + stream.type;
				sources.push(source);
			});
			return sources;
		}

		/**
		 * Fill preview template with data from selected movie
		 * @param {Object} Movie
		 */
		this.fillPreview = function(movie) {
			movieInfoElement.querySelector('.movie-title').innerHTML = movie.title;
			movieInfoElement.querySelector('.movie-year').innerHTML = movie.meta.releaseYear;

			//remove all child spans from .actors container
			movieInfoElement.querySelectorAll('.actors span').forEach(function(element) {
				element.parentNode.removeChild(element);
			})

			movie.meta.actors.forEach(function(entry) {
				let actor = document.createElement('span');
				actor.innerHTML = entry.name;
				movieInfoElement.querySelector('.actors').appendChild(actor);
			})

			movieInfoElement.querySelectorAll('.directors span').forEach(function(element) {
				element.parentNode.removeChild(element);
			})
			
			movie.meta.directors.forEach(function(entry) {
				let director = document.createElement('span');
				director.innerHTML = entry.name;
				movieInfoElement.querySelector('.directors').appendChild(director);
			})
		}

		this.getMoviesListTemplate = function(list) {
			let ul = document.createElement('ul');
			ul.className += 'movies-list-container';

			list.forEach(function(entry) {
				let li = htmlToElement(movieListItemHTML);
				li.id = entry.id;
				li.querySelector('img').src = 'img/' + entry.cover;
				li.querySelector('.movie-title').innerHTML += entry.title;
				li.querySelector('.movie-year').innerHTML += entry.year;
				ul.appendChild(li);
			})
			return ul;
		}
	}
}