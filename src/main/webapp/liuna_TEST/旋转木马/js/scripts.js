$(document).ready(function() {
    $('.single-item').slick({
        dots: true, //	指示点
        infinite: true, //循环播放
        speed: 300,  //滑动时间
        slidesToShow: 1,  //显示模块的个数  1
        slidesToScroll: 1  //幻灯片每次滑动个数 1
    });
    $('.multiple-items').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 2.5,
        slidesToScroll: 2
    });
    $('.one-time').slick({
        dots: true,    //指示点
        infinite: false,//循环播放
        placeholders: false,//占位符。表示新的函数对象中参数的位置。
        speed: 300,  //滑动时间
        slidesToShow: 5,  //展示模块  5
        //touchstart,touchmove判断手机中滑屏方向
        touchMove: false, // ouchstart:接触屏幕时触发，touchmove:活动过程触发，touchend:离开屏幕时触发
        slidesToScroll: 1   //幻灯片每次滑动个数 1
});
    $('.uneven').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4
    });
    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,

        //断点分别为：手机横屏，平板竖屏，pc窄屏，pc宽屏，pc超大屏
        //得保证320px/375px/360px下都访问正常，这就要求对整行
        // 容器或者里面的部分内容进行流式布局，当然在一些特定的情况也需要额外补充些断点。
        responsive: [{   //断点触发设置
            breakpoint: 1024,    //1024px断点
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 600,   //600px断点
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,  //480px断点
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    $('.center').slick({
        centerMode: true,  //中心模式
        centerPadding: '60px',  //中心模式左右内边距
        slidesToShow: 1,//显示模块的个数  1
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }]
    });
    $('.lazy').slick({
        lazyLoad: 'ondemand',  //延迟加载，可选 ondemand 和 progressive
        slidesToShow: 3,
        slidesToScroll: 1
    });
    $('.autoplay').slick({   //自动播放
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,  //自动播放
        autoplaySpeed: 2000
    });

    $('.fade').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,   //淡入淡出
        slide: 'div',
        cssEase: 'linear'   //	CSS3 动画  animate() fallback easing
    });

    $('.add-remove').slick({
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
    var slideIndex = 1;
    $('.js-add-slide').on('click', function() {
        slideIndex++;
        $('.add-remove').slickAdd('<div><h3>' + slideIndex + '</h3></div>');
    });

    $('.js-remove-slide').on('click', function() {
        $('.add-remove').slickRemove(slideIndex - 1);
        if (slideIndex !== 0){
            slideIndex--;
        } 
    });

    $('.filtering').slick({
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 4
    });
    var filtered = false;
    $('.js-filter').on('click', function() {
        if (filtered === false) {
            $('.filtering').slickFilter(':even');
            $(this).text('Unfilter Slides');
            filtered = true;
        } else {
            $('.filtering').slickUnfilter();
            $(this).text('Filter Slides');
            filtered = false;
        }
    });

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 166) {
            $('.fixed-header').show();
        } else {
            $('.fixed-header').hide();
        }
    });

    $('ul.nav a').on('click', function(event) {
        event.preventDefault();
        var targetID = $(this).attr('href');
        var targetST = $(targetID).offset().top - 48;
        $('body, html').animate({
            scrollTop: targetST + 'px'
        }, 300);
    });

});