'use strict';

import TemplateHelper from './template-helper';

export default class MoviesView {
	constructor(model) {
		let moviesList = document.querySelector('.movies-list'),
			detailedInfo = document.querySelector('.movie-info'),
			video = document.querySelector('video'),
			templater = new TemplateHelper(),
			loading = true;

		/**
		 * Append static DOM templates to containers
		 */	
		var drawView = function() {
				let list = model.getShortMovieInfo();
				moviesList.appendChild(templater.getMoviesListTemplate(list));
				detailedInfo.appendChild(templater.getMovieInfoTemplate());
		}

		/**
		 * Updates view after model state changes
		 */	
		var updateView= function() {
			let movie = model.getActiveMovie();
			templater.fillPreview(movie);
			templater.markAsSelected(movie.id);

			while(video.firstChild) {
    			video.removeChild(video.firstChild);
			}

			templater.createPlayerSource(movie.streams).forEach(function(source) {
				video.appendChild(source);
			})
			video.poster = 'img/' + movie.images.placeholder;
			video.load();
		}

		/**
		 * Public method, which is called from model, when it changes
		 */	
		this.notify = function() {
			if(loading) {
				drawView(); //first loading
				loading = false;
			}
			updateView();
		}
	}
}