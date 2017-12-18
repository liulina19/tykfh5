/**
 * Created by Administrator on 2017/8/24.
 */
;(function(){
    var encodingRedirectUrl = function(redirectUrl, jsonp) {
        var l = window.location;
        var _p = l.protocol + '//' + l.host + "" + l.pathname.replace(/^(\/[^\/]+).*/, "$1/") + "services/dispatch.jsp?" + (jsonp === true ? 'wrapJsonP=true&callback=?' : '') + '&dispatchUrl=ClientUni' + encodeURIComponent(redirectUrl);
        return _p;
    };
    var util = $.util,
        dateTime = util.dateTime(),
        randomNum = util.randomNum(6);
    $(document).ready(function(){
        var userInfo = $.parseJSON($.util.getParameter("ReqParam"));
        /**
         * 推荐活动/一周年账单
         * */
        function recommendActivity(){
            //columnSource = 1, //栏目来源 1:星级服务，2：主动服务
            var transactionId = '2000010002'+dateTime+randomNum,
                reqParam = {"transactionId":transactionId,"token":userInfo.token,"channel":userInfo.channel,
                    "channelCode":"H5002018","userLevel":userInfo.userLevel,"mobile":userInfo.mobile,"columnSource":"1"
                };
            $.ajax({
                type:"GET",
                dataType:"JSON",
                timeout:"15000",
                //url:encodingRedirectUrl('/clientuni/services/starLevel/activityRecommend?reqParam='+JSON.stringify(reqParam)),
                url:util.encodingRedirectUrl('/public/sjkf/tips/getTipsByJson.jspx?province=%25E5%258C%2597%25E4%25BA%25AC&pageid=4'),
                success:function(repText){
                    /**
                     * status 1:弹 0：不弹
                     * activityUrl 弹窗地址
                     * */
                    repText = {"resCode":"100","status":"1","activityId":"12","activityUrl":"http://localhost:8/tykfh5/modules/starService/source/InternationalCard/index.html"}
                    if(parseInt(repText.resCode) == 200 && parseInt(repText.status) == 1){
                        var url = repText.activityUrl.lastIndexOf('?')>-1?repText.activityUrl:repText.activityUrl+'?';
                        $('body iframe.iframdh').attr('src',url+'activityId='+repText.activityId);
                    }else{
                        businessWin();
                    }
                }
                ,error:function(){
                    businessWin();
                }
            });
        }
        recommendActivity();

        /**
         * 业务弹窗提醒 文字/文字+按钮
         * */
        function businessWin(){
            //columnSource = 1, //栏目来源 1:星级服务，2：主动服务
            var transactionId = '2000010003'+dateTime+randomNum,
                reqParam = {"transactionId":transactionId,"token":userInfo.token,"channelCode":"H5002018",
                    "mobile":userInfo.mobile,"columnSource":"1"
                };
            $.ajax({
                type:"GET",
                dataType:"JSON",
                timeout:"15000",
                //url:encodingRedirectUrl('/clientuni/services/starLevel/activeRemind?reqParam='+JSON.stringify(reqParam)),
                url:util.encodingRedirectUrl('/public/sjkf/tips/getTipsByJson.jspx?province=%25E5%258C%2597%25E4%25BA%25AC&pageid=4'),
                success:function(repText){
                    repText = {
                        "resCode":"200","status":"1","sceneId":"10","modelId":"A","buttonName":"流量查询",
                        "content":"大佬，您于本月结转流量到账啦，快去瞅瞅！",
                        "jumpUrl":"http://101.95.48.93:8002/tykfh5/modules/businessHandling/queryFlow/index.html"}
                    if(parseInt(repText.resCode) == 200 && parseInt(repText.status) == 1){
                        //modelId A:有内容无按钮， B：有内容有按钮
                        if(repText.modelId == 'A'){
                            $('.window').show().find('.animation').find('.textMsg').show();
                        }else if(repText.modelId == 'B'){
                            $('.window').show().find('.animation').find('.performMsg').show();
                        }
                        contentFilling(repText);
                        $('.animation .content').on({
                            'click':function(){
                                if(repText.jumpUrl.indexOf('?') < 0){
                                    repText.jumpUrl = repText.jumpUrl+'?'
                                }
                                location.href = repText.jumpUrl+'ReqParam='+JSON.stringify(userInfo);
                            }
                        },'.btn');
                    }
                }
                ,error:function(){}
            });
            function contentFilling(repText){
                var content = '',buttonName='';
                switch (parseInt(repText.sceneId)){
                    case 10:
                        content = repText.content;
                        buttonName = repText.buttonName;
                        break;
                    case 15:
                        content = repText.content;
                        buttonName = repText.buttonName;
                        break;
                    case 20:
                        content = repText.content;
                        buttonName = repText.buttonName;
                        break;
                    case 25:
                        content = repText.content;
                        buttonName = repText.buttonName;
                        break;
                    case 30:
                        content = repText.content;
                        buttonName = repText.buttonName;
                        break;
                    case 35:
                        content = repText.content;
                        buttonName = repText.buttonName;
                        break;
                    case 40:
                        content = repText.content;
                        buttonName = repText.buttonName;
                        break;
                    case 45:
                        content = repText.content;
                        buttonName = repText.buttonName;
                        break;
                    case 50:
                        content = repText.content;
                        buttonName = repText.buttonName;
                        break;
                }
                $('.animation .content p').html(content);
                $('.animation .content .btn').html(buttonName);
            }
        }
    });
})();