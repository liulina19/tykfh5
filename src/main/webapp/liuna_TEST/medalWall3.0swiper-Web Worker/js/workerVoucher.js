
//积分抵用券

/* 引入引入公共 "worker.js" */
importScripts('worker.js');

//接收主线程的数据(积分抵用券)
onmessage = function (e) {
    var urlParamVoucher = e.data;
    //使用方法：POST
    ajaxWorker.post(urlParamVoucher,'', function(response,xml) {
        //succcess
        postMessage(response);
    },function(status){
        //fail
        console.log(status);
    });
}

