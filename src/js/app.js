'use strict';

import MoviesService from './movies-service';
import MoviesView from './view';
import Controller from './controller';
import 'element-closest';
import '../css/main.css';

let model = new MoviesService(),
	view = new MoviesView(model),
	ctrl = new Controller(model, view); // eslint-disable-line no-unused-vars