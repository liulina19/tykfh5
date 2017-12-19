/**
 * Created by Administrator on 2017/11/1.
 */
;(function () {
    var util = $.util;
    /**
     * request：网络请求，参数请附加在地址之后
     * @param url：地址，必须
     * @param type:请求类型
     * @param timeOut:请求等待最大时间
     * @param sync:字符串0为同步，其他均为异步
     * @param callback:回调函数,必须
     * */
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
        var userInfo = $.parseJSON(util.getParameter("ReqParam"));
        //userInfo.token = '051c6c762830619b10da65f616703a7c';
        //userInfo.mobile= '18974961757';
        //userInfo.province = '湖南';
        //userInfo.city = '长沙';

        var provinceCityCountyList = localStorage.getItem('provinceCityCountyList');
        if(provinceCityCountyList){

        }

        /**
         * 获取省份、城市、区号
         * */
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
                var provinceCityList = localStorage.getItem('provinceCity');
                //省市缓存
                if(provinceCityList != arr){
                    localStorage.setItem('provinceCity',arr);
                }
            })
        }
        getProvinceCity();

        /**
         * 获取区县接口
         * @param prov 省份
         * @param city 城市
         * @param columnId 栏目id,默认1
         * */
        function getCounty(prov,city,columnId){
            columnId = (columnId==null || columnId=='')?'1':columnId;
            var provinceCityList = localStorage.get('provinceCity');
            var url = util.encodingRedirectUrl('/public/sjkf/nearcolumn/GetAreaByProv?prov='+encodeURIComponent(encodeURIComponent(prov))+'&city='+encodeURIComponent(encodeURIComponent(city))+'&columnId='+columnId);
            request(url,'GET','','',function(res){
                if(res.areaList ==  null){return;}
                var li=res.areaList,arrCounty = [];
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
                            arrCity.push(cityList[j].districtAndCounty);
                            break;
                        }
                    }
                    list[o].city.push(arrCity);
                    break;
                }
                localStorage.setItem('provinceCityCountyList',list);
            })
        }
        getCounty('上海','上海');
    });

})();
//json参数 转get方式 参数
var parseParam=function(param, key){
    if(param == null){
        return "";
    }
    var paramStr="";
    if(param instanceof String||param instanceof Number||param instanceof Boolean){
        paramStr+="&"+key+"="+encodeURIComponent(param);
    }else{
        $.each(param,function(i){
            var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
            paramStr+='&'+parseParam(this, k);
        });
    }
    return paramStr.substr(1);
};