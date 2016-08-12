'use strict';

import TemplateHelper from './template-helper';

export default class MoviesView {
	constructor(model) {
		this._moviesList = document.querySelector('.movies-list');
		this._detailedInfo = document.querySelector('.movie-info');
		this._video = document.querySelector('video');
		this._templater = new TemplateHelper();
		this._loading = true;

		/**
		 * Append static DOM templates to containers
		 */	
		this._drawView = function() {
				let list = model.getShortMovieInfo();
				this._moviesList.appendChild(this._templater.getMoviesListTemplate(list));
				this._detailedInfo.appendChild(this._templater.getMovieInfoTemplate());
		}

		/**
		 * Updates view after model state changes
		 */	
		this._updateView= function() {
			let movie = model.getActiveMovie();
			this._templater.fillPreview(movie);
			this._templater.markAsSelected(movie.id);

			while(this._video.firstChild) {
				this._video.removeChild(this._video.firstChild);
			}

			this._templater.createPlayerSource(movie.streams).forEach(source => {
				this._video.appendChild(source);
			})
			this._video.poster = 'img/' + movie.images.placeholder;
			this._video.load();
		}
	}

	/**
	* Public method, which is called from model, when it changes
	*/	
	notify() {
		if(this._loading) {
			this._drawView(); //first loading
			this._loading = false;
		}
		this._updateView();
	}
}