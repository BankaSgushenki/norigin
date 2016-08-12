'use strict';

export default class TemplateHelper {
	constructor() {
		this._htmlToElement = function(html) {
    		let template = document.createElement('template');
    		template.innerHTML = html;
    		return template.content.firstChild;
		}

		this._movieInfoHTML= '<div><h3 class = "movie-title"></h3><h3 class = "movie-year"></h3><div class = "actors">Actors: </div><div class = "directors">Directors: </div></div>';
		this._movieListItemHTML = '<li><img class = "movie-cover" src=""><p class = "movie-title"></p><p class = "movie-year"></p></li>';
		this._movieInfoElement = this._htmlToElement(this._movieInfoHTML);
	}

	getMovieInfoTemplate () {
		return this._movieInfoElement;
	}

	/**
	* returns array of 'source' elements with src and type attributes
	* @param {Array} streams
	* @return {Array} 'source' elements
	*/
	createPlayerSource(streams) {
		let sources = [];
		streams.forEach(stream => {
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
	fillPreview(movie) {
		this._movieInfoElement.querySelector('.movie-title').innerHTML = movie.title;
		this._movieInfoElement.querySelector('.movie-year').innerHTML = movie.meta.releaseYear;

		//remove all child spans from .actors container
		let actorsList = this._movieInfoElement.querySelectorAll('.actors span');
		for (let i = 0; i < actorsList.length; ++i) {
  			actorsList[i].parentNode.removeChild(actorsList[i]);
		}

		movie.meta.actors.forEach(entry => {
			let actor = document.createElement('span');
			actor.innerHTML = entry.name;
			this._movieInfoElement.querySelector('.actors').appendChild(actor);
		});

		let directorsList = this._movieInfoElement.querySelectorAll('.directors span');
		for (let i = 0; i < directorsList.length; ++i) {
  			directorsList[i].parentNode.removeChild(directorsList[i]);
		}
		
		movie.meta.directors.forEach(entry => {
			let director = document.createElement('span');
			director.innerHTML = entry.name;
			this._movieInfoElement.querySelector('.directors').appendChild(director);
		});
	}

	markAsSelected(id) {
		let list = document.querySelectorAll('.movies-list li');
		for (let i = 0; i < list.length; ++i) {
  			list[i].className = '';
		}
		document.getElementById(id).className = 'selected';
	}

	getMoviesListTemplate(list) {
		let ul = document.createElement('ul');
		ul.className += 'movies-list-container';

		list.forEach(entry => {
			let li = this._htmlToElement(this._movieListItemHTML);
			li.id = entry.id;
			li.querySelector('img').src = 'img/' + entry.cover;
			li.querySelector('.movie-title').innerHTML += entry.title;
			li.querySelector('.movie-year').innerHTML += entry.year;
			ul.appendChild(li);
		});
		return ul;
	}
}