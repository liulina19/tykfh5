

//当前可用积分

/* 引入公共 "worker.js" */
importScripts('worker.js');

//接收主线程的数据（当前可用积分）
onmessage=function (e){
    var  urlParam=e.data;
    //使用方法：GET                                      //response接口返回的对象(json格式的数据)      xml格式数据
    ajaxWorker.get(urlParam, '', function(response,xml) {
            //succcess
            // postMessage(eval(response));
            postMessage(response);

        },
        function(status){
            //fail
            console.log(status);
        });
}