'use strict';

import Observer from './observer';
import loadJSON from './json-loader';

export default class MoviesService {
	constructor() {
		this._moviesList = [];
		this._observer = new Observer;
		this._aсtiveMovie;

		/**
		 * returns movie with specified id
		 * @param {String} id
		 * @return {Object} movie
		 */	
		this._getMovieInfoById = function(id) {
			return this._moviesList.filter(entry => {
				return entry.id === id;
			})[0];
		};
	}

	init() {
		loadJSON('movies.json', data => {
			this._moviesList = JSON.parse(data);
			this._aсtiveMovie = this._moviesList[0];
			this._observer.notify(); //notify all subscribers about model changes
		});
	}

	/**
	* returns movies array with short information 
	* @return {Array} movies
	*/	
    getShortMovieInfo() {
		return this._moviesList.map(entry => {
			return {
				id: entry.id,
				title: entry.title,
				cover: entry.images.cover,
				year: entry.meta.releaseYear
			};
		});
	}

	setActiveMovie(id) {
		this._aсtiveMovie = this._getMovieInfoById(id);
		this._observer.notify();
	}

	getActiveMovie() {
		return this._aсtiveMovie;
	}

	/**
	* Subscribes provided entities for model changes
	* @param {Arguments} entity
	*/	
	subscribe(...args) {
        this._observer.removeAll();
        args.forEach(elem => {
            this._observer.add(elem);
        });
	}
}