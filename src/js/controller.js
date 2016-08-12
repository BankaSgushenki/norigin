'use strict';

export default class MoviesController {
	constructor(model, view) {
		model.subscribe(view); //subscribe view on model changes

		document.querySelector('.movies-list').addEventListener('click', function(e) {
			let parent = e.target.closest('li');
			model.setActiveMovie(parent.id.toString());
		});
	}
}