/* 引入公共 "worker.js" */
 importScripts('worker.js');
onmessage = function (e) {
    url = e.data;
    loadeImg(url)
}
