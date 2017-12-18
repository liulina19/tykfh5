/**
 * Created by Administrator on 2017/9/1.
 */
$(document).ready(function() {

    //

    $('.center').slick({
        centerMode: true,//中心模式
        centerPadding: '60px',//中心模式左右内边距(中心内容到网页两边的距离)
        slidesToShow: 3,  //显示模块的个数  3
        slidesToScroll: 1,   //幻灯片每次滑动个数 1

        responsive: [
            {
                breakpoint: 768,

                settings: {

                    arrows: false,

                    centerMode: true,

                    centerPadding: '40px',

                    slidesToShow: 3

                }

            },

            {

                breakpoint: 480,

                settings: {

                    arrows: false,

                    centerMode: true,

                    centerPadding: '40px',

                    slidesToShow: 1

                }

            }

        ]

    });


});
