'use strict';

import Observer from './observer';
import loadJSON from './json-loader';

export default class MoviesService {
	constructor() {
		let moviesList = [],
			observer = new Observer,
			avtiveMovie;

		/**
		 * returns movie with specified id
		 * @param {String} id
		 * @return {Object} movie
		 */	
		let getMovieInfoById = function(id) {
			return moviesList.filter(entry => {
				return entry.id === id;
			})[0];
		}

		loadJSON('movies.json', data => {
			moviesList = JSON.parse(data);
			avtiveMovie = moviesList[0];
			observer.notify(); //notify all subscribers about model changes

		});

		/**
		 * returns movies array with short information 
		 * @return {Array} movies
		 */	
    	this.getShortMovieInfo = function() {
			return moviesList.map(entry => {
				return {
					id: entry.id,
					title: entry.title,
					cover: entry.images.cover,
					year: entry.meta.releaseYear
				}
			});
		}

		this.setActiveMovie = function(id) {
			avtiveMovie = getMovieInfoById(id);
			observer.notify();
		}

		this.getActiveMovie = function() {
			return avtiveMovie;
		}

		/**
		 * Subscribes provided entities for model changes
		 * @param {Arguments} entity
		 */	
		this.subscribe = function(...args) {
            observer.removeAll();
            args.forEach(elem => {
                observer.add(elem);
            });
        }
	}
}