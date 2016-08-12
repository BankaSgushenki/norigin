'use strict';

import MoviesService from './movies-service';
import MoviesView from './view';
import Controller from './controller';
import closest from 'element-closest';
import '../css/main.css';

let model = new MoviesService(),
	view = new MoviesView(model),
	ctrl = new Controller(model, view);