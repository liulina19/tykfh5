"use strict";
onmessage = function (e) {
    performRequest(e.data)
}
var DOMURL = self.URL || self.webkitURL;
var interval = 2000;

function performRequest(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.onload = function (e) {
		postMessage(DOMURL.createObjectURL(this.response));
		setTimeout(performRequest, interval);
	};
	xhr.send();
}


