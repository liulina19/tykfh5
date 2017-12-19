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
    /*获取经纬度*/
    function  getPosition() {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition,showError);
            // navigator.geolocation.getCurrentPosition(showPosition,showError);
        }else{
           alert("你的手机不支持定位");
        }
    }
    /*获取经纬度*/
    var jsonStr = {};
    function showPosition(position) {
        // x.innerHTML="纬度: " + position.coords.latitude +
        //     "<br>经度: " + position.coords.longitude;
        var weidu=position.coords.latitude,
            jingdu=position.coords.latitude;
        jsonStr={"weidu":weidu,"jingdu":jingdu};
    }
    getPosition();
    function showError(error)
    {
        switch(error.code)
        {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.")
                break;
        }
    }
    /**
     * 获取省份、城市、区号
     * */
    var provice=[];
    function getProvinceCity(){
        var url = util.encodingRedirectUrl('/public/sjkf/roamingDestination/QueryCityAreaCode')+'&page=1&start=0&limit=25';
        request(url,'GET','','',function(res){
            if(res.rtCode != 200){return;}
            var obj = {},m = {},l=res.list,t,arr = [],arrCity = [];
            for(var i=0;i < l.length; i++){
                t = l[i];
                if(m[t.province] == null){
                    m[t.province] = t.province;
                    obj.provice = {};
                    obj.provice[t.province] = {name: t.province,city:[]};
                    arr.push(obj.provice[t.province]);
                }
                if(obj.provice[t.province]){
                    arrCity.push(obj.provice[t.province].city.push({name: t.city,zoneCode: t.zoneCode,districtAndCounty:[]}));
                }
            }
            provice=arr;

            var provinceCityList = JSON.parse(localStorage.getItem('provinceCity'));
            //省市缓存
            if(provinceCityList != arr){
                localStorage.setItem('provinceCity',JSON.stringify(arr));
            }
            showProv(arr);
        })
    }
    getProvinceCity();
    /**
     * 获取区县接口
     * @param prov 省份
     * @param city 城市
     * @param columnId 栏目id,默认1
     * */
    function getCounty(prov,city,columnId,val){
        columnId = (columnId==null || columnId=='')?'1':columnId;
        var provinceCityList = JSON.parse(localStorage.getItem('provinceCity')),
            arrCounty = [];
        var url = util.encodingRedirectUrl('/public/sjkf/nearcolumn/GetAreaByProv?prov='+encodeURIComponent(encodeURIComponent(prov))+'&city='+encodeURIComponent(encodeURIComponent(city))+'&columnId='+columnId);
        request(url,'GET','','1',function(res){
            if(res.areaList ==  null){return;}
            var li=res.areaList;
            for(var i=0;i < li.length; i++){
                arrCounty.push(li[i].areaName);
            }
            var list = provinceCityList,cityList,arrCity = [],arrProv = [];
            for(var o=0;o<list.length;o++){
                if(list[o].name != prov){continue;}
                cityList = list[o].city;
                for(var j=0;j<cityList.length;j++){
                    if(cityList[j].name == city){
                        cityList[j].districtAndCounty=arrCounty;
                        break;
                    }
                }
                break;
            }
            // console.log(list);
            provice=list;
            var countryLen = provice[current.prov]['city'][val - 1].districtAndCounty.length;
            if (countryLen == 0) {
                $('#addr-show').text(provice[current.prov].name + '-' + provice[current.prov]['city'][current.city].name);
                return;
            }
            var countryJq = [];
            for (var t = 0; t < countryLen; t++) {
                countryJq.push('<option>' + provice[current.prov]['city'][val - 1].districtAndCounty[t] + '</option>')
            }

            $('#country').html('<option>选择县区</option>' + countryJq.join(''));
        })
    }
    //ajax 附近网点的参数
    var paramJson={};
    /*拼接JSON参数*/
    paramJson.prov="上海";paramJson.city="上海";paramJson.area="静安区";paramJson.PageSize="10";paramJson.PageIndex="1";
    paramJson.columnId="1";paramJson.distance="1000";paramJson.classifyName="4G";
    paramJson.lng=jsonStr.jingdu;paramJson.lat=jsonStr.weidu;
    paramJson.version="";paramJson.deviceOS="IOS";paramJson.channelId="happygo";
    paramJson.yytlevel="1,2,3,4,5";paramJson.yytstatus="1";paramJson.selfYyt="";
    nearbyRequest(null,true);

    var userInfo = {};
    //距离、地点、智能分类 的tab选择卡
   $('.tab_One').each(function (index,obj) {
       var tabDiv=$(".tabHide");
       $(obj).click(
           function () {
               var display=tabDiv.eq(index).css('display');
               tabDiv.hide();
               if(display == 'none'){
                   tabDiv.eq(index).show();
                   $(this).find('span').addClass('selected');
                   $(this).find('i').removeClass('tabOneidown').addClass('tabOneiupBlue');
               }else{
                   tabDiv.eq(index).hide();
                  $(this).find('span').removeClass('selected');
                  $(this).find('i').removeClass('tabOneiupBlue').addClass('tabOneidown');
               }
           }
       );
   });
    // 距离 智能分类下拉菜单内容的选择
    function selectedList(titleDom,idDom) {
        var tabHideTitle = $(titleDom);
        var iHtml = '<i class="tabHide-i"></i>';
        $(idDom).on('click','li',function () {
            // 判断是否含有Class   tabHideline
            var haveClass = $(this).hasClass("tabHideline");
            // 清除样式
            $(idDom).find('i').remove();
            $(idDom).find('li').removeClass("tabHideline");
            if ( haveClass){
                $(this).removeClass('tabHideline');
            }else{
                $(this).addClass('tabHideline');
                $(this).append(iHtml);
                //给头部标题赋值
                var result = $(this).find('span').text();
                tabHideTitle.text(result);
                // console.log($(this));
                //选中条件时关闭下拉内容
                $(this).parent().parent().parent().css({"display":"none"});
            }
            if(titleDom=="#tabTitle_JL"){
                paramJson.distance=$(this).text();
            }else if(titleDom== "#tabTitle_ZNFL"){
                paramJson.classifyName=$(this).text();
            }
            /*调接口刷新列表*/
            nearbyRequest(paramJson,false);
        })
    }
    selectedList("#tabTitle_JL","#tabHide_OneDiv");
    selectedList( "#tabTitle_ZNFL","#abHide_One_Div");
    // 距离下拉菜单内容
    function distanceHtml(distanceList) {
        var distanceArray = [];
        $.each(distanceList,function (i,distanceListObj) {
            distanceArray.push('<li >');
                distanceArray.push( '<span>'+distanceListObj.name+'</span>' );
            distanceArray.push('</li>');
        });
        $("#tabHide_OneDivUl").html(distanceArray.join(""));
    }
    // 智能分类下拉菜单内容
    function brainHtml(brainList) {
        var brainArray=[];
        $.each(brainList,function (i,brainListObj) {
            brainArray.push('<li>');
                brainArray.push('<span>'+brainListObj.name+'</span>');
            brainArray.push('</li>');
        });
        $("#abHide_One_DivUl").html(brainArray.join(""));
    }
    //****************下面是城市三级联动******************//
    var prov = $('#prov'),
        city = $('#city'),
        country = $('#country');
    /*用于保存当前所选的省市区*/
    var current = {
        prov: '',
        city: '',
        country: ''
    };
    // showProv();
    /*加载省份列表*/
    function showProv(ProvList) {
        //$('#met1.btncolor').disabled = true; //不选择省市县点确定按扭没有反应
            var proviceJq = [];
            for (var p = 0; p < ProvList.length; p++) {
                // console.log(ProvList[p]);
                proviceJq.push('<option class="option1">' + ProvList[p]['name'] + '</option>')
            }
            $('#prov option').after(proviceJq.join(''));
    }

    /*根据所选的省份来显示城市列表*/
    $(document).on('change', '#prov', function () {
        var val = $('#prov option:selected').index();

        if (val != 0) {
            //省份-1从0开始
            current.prov = val - 1;
            var cityLen = provice[val - 1]["city"].length;//获取选择的省里面的所有市
            var cityJq = [];
            for (var c = 0; c < cityLen; c++) {
                cityJq.push('<option class="option1">' + provice[val - 1]['city'][c].name + '</option>')
            }
            $('#city').html('<option>选择城市</option>' + cityJq.join(''));
            // getCounty();
        } else {
            $('#city').html('<option>选择城市</option>');
            $('#country').html('<option>选择城市</option>');
        }
    });

    /*根据所选的城市来显示县区列表*/
    $(document).on('change', '#city', function () {
        var val = $('#city option:selected').index(),
            provText = $('#prov option:selected').text(),
            cityText = $('#city option:selected').text();
            getCounty(provText,cityText,1,val);

        if (val != 0) {
            current.city = val - 1;
        } else {
            $('#country').html('<option>选择县区</option>');
        }
    })
    /*选择县区之后的处理函数*/
    $(document).on('change', '#country', function () {
        var obj = $('#country option:selected').index();
        if (obj != 0) {
            $('#met1.btncolor').disabled = false;
            $('#met1').addClass('btncolor');
            current.country = obj-1;
        } else {
            $('#met1').removeClass('btncolor');
        }
    })

    /*点击确定按钮显示用户所选的地址*/
    $(document).on('click', '.btncolor', function () {
        $('#addr-show').text(provice[current.prov].name + '-' + provice[current.prov]["city"][current.city].name + '-' + provice[current.prov]["city"][current.city].districtAndCounty[current.country]);
        $('.tabHide').css({"display":"none"});
        paramJson.prov=provice[current.prov].name;
        paramJson.city= provice[current.prov]["city"][current.city].name;
        nearbyRequest(paramJson,false);
    })
    // 点击取消按钮取消用户所选的地址
    $(document).on('click', '.btnClear', function () {
        $('.tabHide').css({"display":"none"});
    })

    /*附近网点 ajax*/
    /*param参数是接口参数   isFirst判断是否是第一次调接口（true的时候初始化页面的智能分类和距离LIST；false不用再初始化页面） */
    function nearbyRequest(param,isFirst) {
        /*转化GET方式参数*/
       // var paramList= parseParam(param);
       // 参数拼接
       //  var paramList='prov='+paramJson.prov+'&city='+paramJson.city+'&area='+paramJson.area+'&PageSize='+paramJson.PageSize+
       //      '&PageIndex='+paramJson.PageIndex+'&columnId='+paramJson.columnId+'&distance='+paramJson.distance+'&classifyName='+paramJson.classifyName+
       //      '&lng='+paramJson.lng+'&lat='+paramJson.lat+'&version='+paramJson.version+'&deviceOS='+paramJson.deviceOS+'&channelId='+paramJson.channelId+
       //      '&yytlevel='+paramJson.yytlevel+'&yytstatus='+paramJson.yytstatus+'&selfYyt='+paramJson.selfYyt;
       //  console.log(paramList);

        var baseUrl = '/public/sjkf/nearcolumn/GetNearColumnList?';
        $.ajax({
            type: 'POST',
            dataType: "json",
            timeout: 15000,
            url: util.encodingRedirectUrl(baseUrl)+'columnId=1&channelId=happygo&PageSize=0',
            success: function(data) {
                if(data.resCode == '200' ) {
                    if(isFirst){
                        nearbyHtml(data.nearList);
                        distanceHtml(data.distinctList);
                        brainHtml(data.classifyList);
                    }else {
                        nearbyHtml(data.nearList);
                    }
                }
            }
        })
    }

    /**
     * html 附近网点
     * @param nearbyList
     */
    function nearbyHtml(nearbyList) {
        var htmlArray=[];
        $.each(nearbyList,function (i,nearbyListObj) {
            htmlArray.push( '<li><div class="outletOne"><img src="image/1.png"></div><div class="outletTwo"> ' );
            htmlArray.push( '<p class="outletTwo_part1">' +nearbyListObj.yyt_name + '</p><p class="outletTwo_part2">' + nearbyListObj.yyt_address + '</p> ') ;
            htmlArray.push( '<p class="outletTwo_part3">' );
            htmlArray.push( '<span><img src="image/4.png">' + nearbyListObj.yyt_tel + '</span>' );

            if(nearbyListObj.listHomeIco!=null && nearbyListObj.listHomeIco.length>0){
            $.each(nearbyListObj.listHomeIco,function (o,nearbyIco) {
                htmlArray.push(  '<span><img src="'+util.encodingRedirectUrlForRes(nearbyIco.happygo_4kimgurl)+'"></span>') ;
            });
        }
            htmlArray.push(   '</p>' )
            htmlArray.push(   '</div><div class="outletThree"><div class="outletThree_Is"><img src="image/67.png"><span>' + (nearbyListObj.distance)*1000 + '米</span></div>' );
            htmlArray.push(    '<a href="details.html"><div class="outletThree_i"><i class="outletThree_idown"></i></div></a>' );
            htmlArray.push(   '</div>' );
            htmlArray.push(   '</li>');
        });
        $("#outletUl").html(htmlArray.join(""));
    }
    /*详情页*/
    function detailsHtml(detailList) {
        var htmlArray=[];
        // var detailHTML =
        htmlArray.push( '        <div class="details">' );
        htmlArray.push(  '            <div class="detailsLeft">' );
        htmlArray.push( '                <img src="'+detailList.yytLogo+'">' );
        htmlArray.push( '            </div>' );
        htmlArray.push( '            <div class="detailsRight">' );
        htmlArray.push( '                <p class="address">'+ detailList.yytName +' </p>' );
        htmlArray.push( '                <p class="stars"><span class="star-five"></span></p>' );
        htmlArray.push( '                <p class="week">周一到周日</p>' );
        htmlArray.push( '                <p class="businessHours">8:30到20:30</p>' );
        htmlArray.push( '            </div>' );
        htmlArray.push(  '        </div>' );
        htmlArray.push( '        <div class="service">' );
        $.each(detailList.listHomeIco,function (i,detailListIco) {
            htmlArray.push( '            <div class="serviceL">' );
            htmlArray.push( '                <span><img src="'+util.encodingRedirectUrlForRes(detailListIco.happygo_imgurl)+'">' );
            htmlArray.push( '                </span><span>'+detailListIco.summary+'</span>' );
            htmlArray.push( '            </div>' );
        });
        htmlArray.push( '        </div>' );
        htmlArray.push( '        <div class="addressDe"><p>'+detailList.yytAddress+'</p><i class="rightArrow rightAr"></i></div>' );
        htmlArray.push( '        <div class="addressDe">' );
        htmlArray.push( '            <img style=" padding-left: 1.625em;" src="image/tell.png">' );
        htmlArray.push( '            <p style="padding-left: 0em;">'+detailList.yytTel+'</p>' );
        htmlArray.push( '            <i class="rightArrow rightAr"></i>' );
        htmlArray.push( '        </div>' );
        $(".details-wraper").html(htmlArray.join(""));
    }

    //ajax 网点详情
    function detailsRequest(param) {
        var baseUrl = '/public/sjkf/nearcolumn/GetNearColumnInfo.jspx?id=24057&columnId=4';
        $.ajax({
            type: 'get',
            dataType: "json",
            timeout: 15000,
            url: util.encodingRedirectUrl(baseUrl),
            success: function(data) {
                if(data.resCode == '200' ) {
                    detailsHtml(data);
                }
            }
        })
    }
    detailsRequest();





})()































