;(function () {
    var util = $.util;
    var request = function(url,type,timeOut,sync,callback){
        $.ajax({
            type: type || 'POST',
            url: url,
            time: timeOut ||'15000',
            dataType: 'json',
            async:sync==='0'?false:true,
            success:function(res){
                callback(res)
            },error:function(){
                callback({'resCode':'error'});
            }
        });
    };
    $(document).ready(function () {

        //获取页面每条数据的ID  时间   营业厅等级
        var id = $.util.getParameter("id"),
            tradecycle = $.util.getParameter("tradecycle"),
            tradetime = $.util.getParameter("tradetime"),
            level = $.util.getParameter("level") || '';

        /*详情页 details.html*/
        function detailsHtml(detailList) {
            var htmlArray=[];
            var detailHTML =
                htmlArray.push( '<div class="outletWrap">' );
            //营业厅等级
            htmlArray.push( '<div class="outletOne"><img src="'+detailList.yytLogo+'"><div style="position: absolute;" class="level">'+level+'</div></div>' );
            htmlArray.push( '<div class="outletTwo">' );
            htmlArray.push( '<p class="outletTwo_part1">'+ detailList.yytName +'</p>' );
            htmlArray.push( '<div class="outletTwo_part2">' );
            htmlArray.push( '<div style="float: left;">' );
            htmlArray.push( '<div class="stark"></div>' );
            htmlArray.push( '<div class="left">' );
            htmlArray.push( '<div class="stars" style="width:'+(detailList.yytScore)*16+'px"><img src="image/stars.png"></div>' );
            htmlArray.push( '</div>' );
            htmlArray.push( '</div>' );
            htmlArray.push( '</div>' );
            htmlArray.push( '<p class="outletTwo_part2">'+detailList.yytAddress+'</p>' );
            htmlArray.push( '<p class="outletTwo_part2">' );
            //时间
            htmlArray.push( '<span>'+tradecycle+'&nbsp;&nbsp;</span>' );
            htmlArray.push( '<span>'+tradetime+'</span>' );
            htmlArray.push( '</p>' );
            htmlArray.push( '</div>' );
            htmlArray.push( '</div>' );
            htmlArray.push( '<div class="service">' );

            //自造数据 4g 补卡等  小标签列表
            detailList.listHomeIco=[
                {
                    summary: "4G业务",
                    id: 6,
                    title: "4G业务",
                    isFlag: 0,
                    happygo_imgurl: "/res/upload/interface/apptutorials/homeico/ecf60c3c-a9a9-4f29-92cc-db4eddd28ef4.png",
                    contentinfo: "提供天翼4G业务办理或体验",
                    url: "/res/upload/interface/apptutorials/homeico/5bbda6d4-e1c6-4ce6-a02b-bde93ec4d199.png"
                },
                {
                    summary: "异地补卡",
                    id: 21,
                    title: "异地补卡",
                    isFlag: 0,
                    happygo_imgurl: "/res/upload/interface/apptutorials/homeico/ee6ce1ff-0d0e-4504-9271-624575bc00b3.png",
                    contentinfo: "异地补换卡业务需要用户出示有效身份证件（居民身份证、护照、军官证等），并由营业厅复印留存归档。",
                    url: "/res/upload/interface/apptutorials/homeico/2e6d7dcd-72ea-43ba-bdea-c408b3b998f0.png"
                },
                {
                    summary: "微店",
                    id: 161,
                    title: "微店",
                    isFlag: 2,
                    happygo_imgurl: "/res/upload/interface/apptutorials/homeico/c4ad6bd0-6abe-47b2-a2ba-4e1b40ac516a.png",
                    contentinfo: "选择最近的营业厅微店，让便利成为我们生活的首选。",
                    url: "/res/upload/interface/apptutorials/homeico/82ac6f05-03c1-4f31-a734-57e0ea81912c.jpg"
                }
            ];

            //小标签列表
            $.each(detailList.listHomeIco,function (i,detailListIco) {
                htmlArray.push( '<div data-id="'+detailListIco.id+'" class="serviceL">' );
                htmlArray.push( '<div class="serviceLcont">' );
                htmlArray.push( '<span><img src="'+util.encodingRedirectUrlForRes(detailListIco.happygo_imgurl)+'"></span>' );
                htmlArray.push( '<span>'+detailListIco.summary+'</span>' );
                htmlArray.push( '</div>' );//serviceLcont结束
                htmlArray.push( '</div>' );

                //缓存 小图片 弹窗内容
                var keyIdDialog=detailListIco.id;
                var valueDialog=detailListIco.summary+"&"+detailListIco.contentinfo;
                // localStorage[keyIdDialog]=valueDialog;
                localStorage.setItem(keyIdDialog,valueDialog);
            })

            //如果serviceL的总个数是奇数个，最后添加一整个serviceL
            // console.log((detailList.listHomeIco).length);
            if(detailList.listHomeIco.length %2 != 0){
                htmlArray.push( '<div class="serviceL">' );
                htmlArray.push( '<div class="serviceLcont">' );
                htmlArray.push( '<span></span>' );
                htmlArray.push( '<span></span>' );
                htmlArray.push( '</div>' );//serviceLcont结束
                htmlArray.push( '</div>' );
            }

            htmlArray.push( '</div>' );
            htmlArray.push( '<div class="addressDe">' );
            htmlArray.push( '<span><img src="image/map.png"></span><span>'+detailList.yytAddress+'</span>' );
            htmlArray.push( '</div>' );
            htmlArray.push( '<div class="addressDe">' );
            htmlArray.push( '<span><img src="image/detail-phone.png"></span>' );
            htmlArray.push( '<span>'+detailList.yytTel+'</span>' );
            htmlArray.push( '<div class="addressT"><a href="tel:'+detailList.yytTel+'"><i class="IfaceRight"></i></a></div>' );
            htmlArray.push( '</div>' );
            // htmlArray.push( '<div class="addressDe">' );
            // htmlArray.push( '<span><img src="image/weidian.png"></span>' );
            // htmlArray.push( '<span><a href="tel:021-63843450">微店</a></span>' );
            // htmlArray.push( '<div class="addressT">更多<i class="IfaceRight"></i></div>' );
            htmlArray.push( '</div>' );
            $(".detailsLi").html(htmlArray.join(""));

            //弹框点击事件
            $(".serviceL").on("click",function () {
                var LayerOne = $('.detailsLayerOne');
                var display = LayerOne.css('display');
                var cacheKey=$(this).data("id");
                var cacheValue=localStorage.getItem(cacheKey);
                if(cacheValue!=null){
                    var cacheValueArray=cacheValue.split("&");
                    LayerOne.find(".LayermainTitle").children("p").text(cacheValueArray[0]);
                    LayerOne.find(".LayermainCon").children("p").text(cacheValueArray[1]);
                }else{
                    return;
                }
                if(display == 'none'){
                    LayerOne.show();
                }else{
                    LayerOne.hide();
                }
            })

            //关闭弹框
            $('.close').on("click",function () {
                $('.detailsLayerOne').hide()
            })
        }

        //弹框HTML
        // function detailsLayerHTML(detailsLayer) {
        //     var htmlArray = [];
        //     var detailsLayerHTML =
        //         htmlArray.push( '<div class="detailsLayerOne hide">' );
        //     htmlArray.push( '<div class="LayerWrap LayerCenter"></div>' );
        //     htmlArray.push( '<div class="Layermain LayermainTwo">' );
        //     htmlArray.push( '<div class="close LayermainClose"></div>' );
        //     htmlArray.push( '<div class="LayermainTitle">' );
        //     htmlArray.push( '<p>4G业务11111111</p>' );
        //     htmlArray.push( '</div>' );
        //     htmlArray.push( '<div class="LayermainCon">' );
        //     htmlArray.push( '<p>异地补换卡业务需要用户出示有效身份证件（居民身份证、护照、军官证等），并由营业厅复印留存归档。</p>' );
        //     htmlArray.push( '</div>' );
        //     htmlArray.push( '</div>' );
        //     htmlArray.push( '</div>' );
        //
        //     $(".detailsLayer").html(htmlArray.join(""));
        // }


        //ajax 网点详情
        function detailsRequest(param) {
            var baseUrl = '/public/sjkf/nearcolumn/GetNearColumnInfo.jspx?columnId=1&channelId=happygo&id='+id;
            $.ajax({
                type: 'get',
                dataType: "json",
                timeout: 15000,
                url: util.encodingRedirectUrl(baseUrl),
                success: function(data) {
                    if(data.resCode == '200' ) {
                        detailsHtml(data);
                        // detailsLayerHTML(data);
                    }
                }
            })
        }
        detailsRequest();
    })

})()