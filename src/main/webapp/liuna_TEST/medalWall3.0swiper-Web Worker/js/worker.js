
//公共worker.js
//此文件worker.js是封装的原生JS调接口方法


//创建ajaxWorker原始对象
var ajaxWorker = {};
//判断IE版本  兼容各个IE版本
ajaxWorker.xhrWorker = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ],
        i;

    for (i = 0; i < versions.length; i++) {
        try {
            new ActiveXObject(versions[i]);
            //arguments对象是所有（非箭头）函数中都可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。此对象包含传递给函数的每个参数的条目，第一个条目的索引从0开始。
            arguments.activeXString = versions[i];
            break;
        } catch (e) {
            //跳过
        }
    }
    //callee放回正在执行的函数本身的引用，它是arguments的一个属性   activeXString是createXHR对象的一个属性
    return new ActiveXObject(arguments.callee.activeXString)
};

//给ajaxWorker增加一个send()的方法(用于传送数据)   Ajax请求中的 async :false为同步     async: true 时，ajax请求是异步的。
ajaxWorker.send = function (url, method, data, success,fail,async) {
    if (async === undefined) {
        async = true;
    }
    //ie7及更高版本数据请求
    var xhrWorker = ajaxWorker.xhrWorker();
    xhrWorker.open(method, url, async);
    //设置回调函数,接收服务器端的信息以进行处理
    xhrWorker.onreadystatechange = function () {

        //readyState属性表示请求/响应过程的当前活动阶段  一共有四个阶段：0：未初始化     1：启动   2：发送   3：接收   4：完成
        if (xhrWorker.readyState == 4) {
            //status响应的HTTP状态
            if ( (xhrWorker.status >= 200 && xhrWorker.status < 300) || xhrWorker.status == 304) {
                //responseText作为响应主体被返回的文本
                postMessage(xhrWorker.responseText);
            } else {
                fail && fail(xhrWorker.status);
            }
        }
    };
    if (method == 'POST') {
        xhrWorker.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    try{
        xhrWorker.send(data,'','',function (ie) {
            postMessage(ie);
        })
    }catch (ex){
        fail && fail(404);
    }
};


// 封装ajaxWorker请求的get方法
ajaxWorker.get = function (url, data, callback, fail, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajaxWorker.send(url + (query.length ? '?' + query.join('&') : ''), 'GET', null, callback, fail, async)
};

// 封装ajaxWorker请求的post方法
ajaxWorker.post = function (url, data, callback, fail, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajaxWorker.send(url,'POST', query.join('&'), callback, fail, async)
};


//使用方法：GET
// ajax.get('/test.php', {foo: 'bar'}, function(response,xml) {
//         //success
//     },
//     function(status){
//         //fail
//     });



//使用方法：POST
// ajax.post('/test.php', {foo: 'bar'}, function(response,xml) {
//     //succcess
//
// },function(status){
//     //fail
//
// });

