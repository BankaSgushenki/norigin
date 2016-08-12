'use strict';

export default function loadJSON(url, callback) {   
	let xhr = new XMLHttpRequest();
	xhr.overrideMimeType('application/json');
    xhr.open('GET', url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == '200') {
			callback(xhr.responseText);
		}
	}
	xhr.send(null);
}