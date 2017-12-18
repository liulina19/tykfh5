//原生JS调接口

//创建ajax原始对象
var ajax = {};
//判断IE版本
ajax.xhr = function () {
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
            arguments.activeXString = versions[i];
            break;
        } catch (e) {
            //跳过
        }
    }
    return new ActiveXObject(arguments.callee.activeXString);
};
//给ajax增加一个send()的方法  用于传送数据
ajax.send = function (url, method, data, success,fail,async) {
    if (async === undefined) {
        async = true;
    }
    //ie7及更高版本数据请求
    var xhr = ajax.xhr();
    xhr.open(method, url, async);
    //设置回调函数,接收服务器端的信息以进行处理
    xhr.onreadystatechange = function () {
        //readyState属性表示请求/响应过程的当前活动阶段  一共有四个阶段：0：未初始化     1：启动   2：发送   3：接收   4：完成
        if (xhr.readyState == 4) {
            //status响应的HTTP状态
            if ( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                //responseText作为响应主体被返回的文本
                // responseXML如果响应的内容类型是"text/xml"或"application/xml"这个属性中将保存包含着响应数据的XML DOM文档
                //判断数据类型    原生js方法 eval()是将json字符串转化为json对象
                if(typeof xhr.responseText === 'string'){
                    success && success(eval(xhr.responseText),xhr.responseXML);
                } else if(typeof xhr.responseText === 'object'){   //object是对象
                    success && success(xhr.responseText,xhr.responseXML);
                }
            } else {
                fail && fail(xhr.status);
            }
        }
    };
    if (method == 'POST') {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    try{
        xhr.send(data)
    }catch (ex){
        fail && fail(404);
    }
};


// 封装ajax请求的get方法
ajax.get = function (url, data, callback, fail, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), 'GET', null, callback, fail, async)
};

// 封装ajax请求的post方法
ajax.post = function (url, data, callback, fail, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url,'POST', query.join('&'), callback, fail, async)
};



//使用方法：GET                                      //response接口返回的对象(json格式的数据)      xml格式数据
// ajax.get('http://localhost/firstOne/service/data.do', {foo: 'bar'}, function(response,xml) {
//         //succcess
//         console.log(response);
//         console.log(xml);
//         // postMessage(eval(response));
//
//         postMessage(response);
//
//     },
//     function(status){
//         //fail
//         console.log(status);
//     });

var i = 123;
postMessage(i);