$(document).ready(function() {
// 圆
var dotLeft =0;
var dotTop=0;
var ahd =null;
var speed =0;
var radius=0;
var ainhd=5;
$(function(){
//		//中心点横坐标
    dotLeft = ($(".yuan").width())/2-40;
//		//中心点纵坐标
    dotTop = ($(".yuan").height())/2-380;

    //起始角度
    var stard = -60;
    //半径
    radius = 365;
    //每一个BOX对应的角度;
    var avd =360/$(".box").length;
    //每一个BOX对应的弧度;
    ahd = avd*Math.PI/180;
    //运动的速度
    speed = 100;
    //设置圆的中心点的位置
//        $(".dot").css({"left":dotLeft,"top":dotTop});
    //设置DIV圆形排列
    $.each($(".box"),function(index, element){
        $(this).css({"left":Math.sin((ahd*index))*radius+dotLeft,"top":Math.cos((ahd*index))*radius+dotTop});
    });



})

//圆的手势滑动
var jvli=0;
var fun_animat1 = function(speed){

    jvli+=speed;
    ainhd = jvli*Math.PI/180;

    //按速度来定位DIV元素
    $(".box").each(function(index, element){
        $(this).css({"left":Math.sin((ahd*index+ainhd))*radius+dotLeft,"top":Math.cos((ahd*index+ainhd))*radius+dotTop});
    });
}

var startx=0, starty=0;
var zend=0;
var yuanw = document.getElementById("yuan");


yuanw.addEventListener("touchstart",function(e){
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;

//			 console.log(startx+"="+startx);
},false)


yuanw.addEventListener("touchmove",function (event){
    event.preventDefault();
    var touch = event.touches[0]; //获取第一个触点
    var x = Number(touch.pageX); //页面触点X坐标
    var y = Number(touch.pageY); //页面触点Y坐标
    var sss=  x-startx;
    if(sss > 0 ){
        fun_animat1(2);
    }else{
        fun_animat1(-2);
    }
},false);


// 左右滑动
 var currentLeft = 0, //记录滑动到当前的位置
     leftSpeed = -20,  // 向左（负方向）滑动的速度
     rightSpeed = 20,  //向右（正方向）滑动的速度
     touchWidth = 0,

     maxLeft = 0;

    $(function () {
        //精彩活动
        currentLeft = parseInt($(".itemDiv").css("left").replace("em",""));
        touchWidth = $(document).width();  //获取屏幕的宽度
        var itemDiv = $(".itemDiv").width();  //滑动容器的长度
        maxRight = itemDiv - touchWidth;   //滑动到最右边需要滑动的长度
        var starX = 0;

        // console.log(touchWidth + ":" + itemDiv + ":" + maxRight);
        var touchDiv = document.getElementById("jchdTouch");  //手势滑动的范围

        touchDiv.addEventListener("touchstart",function (e){
            starX = e.touches[0].pageX;
        })
        
        touchDiv.addEventListener("touchmove",function (event) {
            var touch = event.touches[0]; //获取第一个触点
            var X = Number(touch.pageX); //第一个触点X坐标
            var leftOrRight = X - starX;  //向左向右滑动

            moveDiv(leftOrRight,maxRight,".itemDiv");
        })

        //折扣专区
        currentLeft_zk = parseInt($(".zkzqDiv").css("left").replace("em",""));
        var itemDivZkzq = $(".zkzqDiv").width();  //滑动容器的长度
        maxRightZkzq = itemDivZkzq - touchWidth;   //滑动到最右边需要滑动的长度
        var starXZkzq = 0;

        // console.log(touchWidth + ":" + itemDiv + ":" + maxRight);
        var touchDivZkzq = document.getElementById("zkzqTouch");  //手势滑动的范围

        touchDivZkzq.addEventListener("touchstart",function (e){
            starXZkzq = e.touches[0].pageX;
        })

        touchDivZkzq.addEventListener("touchmove",function (event) {
            var touchZkzq = event.touches[0]; //获取第一个触点
            var XZkzq = Number(touchZkzq.pageX); //第一个触点X坐标
            var leftOrRightZkzq = XZkzq - starXZkzq;  //向左向右滑动

            moveDiv_zk(leftOrRightZkzq,maxRightZkzq,".zkzqDiv");
        })

        //红包专区
        currentLeft_zk = parseInt($(".hbzqDiv").css("left").replace("em",""));
        var itemDivZkzq = $(".hbzqDiv").width();  //滑动容器的长度
        maxRightHbzq = itemDivZkzq - touchWidth;   //滑动到最右边需要滑动的长度
        var starXHbzq = 0;

        // console.log(touchWidth + ":" + itemDiv + ":" + maxRight);
        var touchDivHbzq = document.getElementById("hbzqTouch");  //手势滑动的范围

        touchDivHbzq.addEventListener("touchstart",function (e){
            starXHbzq = e.touches[0].pageX;
        })

        touchDivHbzq.addEventListener("touchmove",function (event) {
            var touchHbzq = event.touches[0]; //获取第一个触点
            var XHbzq = Number(touchHbzq.pageX); //第一个触点X坐标
            var leftOrRightHbzq = XHbzq - starXHbzq;  //向左向右滑动

            moveDiv_zk(leftOrRightHbzq,maxRightHbzq,".hbzqDiv");
        })


    })

    //leftOrRight 判断向左向右     maxRightcs 滑到最右边的最大值    itemDiv需要滑动的Div的名字
    function moveDiv(leftOrRight,maxRightcs,itemDiv) {
        if(leftOrRight <= 0){  //左
            currentLeft += leftSpeed;
            if(currentLeft <= -maxRightcs){
                currentLeft = -maxRightcs;
            }
            $(itemDiv).css({"left":currentLeft});
        } else {  //右
            currentLeft += rightSpeed;
            if(currentLeft >= 0){
                currentLeft = 0;
            }
            $(itemDiv).css({"left":currentLeft});
        }
    }
    function moveDiv_zk(leftOrRight,maxRightcs,itemDiv) {
        if(leftOrRight <= 0){  //左
            currentLeft_zk += leftSpeed;
            if(currentLeft_zk <= -maxRightcs){
                currentLeft_zk = -maxRightcs;
            }
            $(itemDiv).css({"left":currentLeft_zk});
        } else {  //右
            currentLeft_zk += rightSpeed;
            if(currentLeft_zk >= 0){
                currentLeft_zk = 0;
            }
            $(itemDiv).css({"left":currentLeft_zk});
        }
    }


})