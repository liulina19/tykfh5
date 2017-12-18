"use strict";

var img = new Image();

var worker = new Worker('worker.js');
var DOMURL = self.URL || self.webkitURL;
var url ="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510032829790&di=6a863f02d74ef7cf5f75d6d9ea4fc31c&imgtype=0&src=http%3A%2F%2Fwww.qqpk.cn%2FArticle%2FUploadFiles%2F201111%2F2011111111210035.jpg";
worker.postMessage(url);
worker.onmessage = function (event) {
	img.onload = function (e) {
		DOMURL.revokeObjectURL(event.data);
	};
	img.src = event.data;
};
