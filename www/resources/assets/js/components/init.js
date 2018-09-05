$(document).ready(function() {

    // detect transit support
    /*var transitFlag = true;
    if (!Modernizr.cssanimations) {
        transitFlag = false;
    }*/

    $('.wForm').each(function() {
        var formValid = $(this);
        formValid.validate({
            showErrors: function(errorMap, errorList) {
                if (errorList.length) {
                    var s = errorList.shift();
                    var n = [];
                    n.push(s);
                    this.errorList = n;
                }
                this.defaultShowErrors();
            },
            invalidHandler: function(form, validator) {
                $(validator.errorList[0].element).trigger('focus');
                formValid.addClass('no_valid');
            },
            submitHandler: function(form) {
                formValid.removeClass('no_valid');
                if (form.tagName === 'FORM') {
                    form.submit();
                } else {
                    $.ajax({
                        type: 'POST',
                        url: $(form).attr('data-form-url'),
                        /* path/to/file.php */
                        data: $(form).find('select, textarea, input').serializeArray(),
                        dataType: 'json',
                        success: function(data) {

                        },
                        error: function() {
                            console.info('Для верстальщика все ок :)');
                        }
                    });
                }
            }
        });
    });

    /* Без тега FORM */
    $('.wSubmit').on('click', function(event) {
        var form = $(this).closest('.wForm');
        form.valid();

        if (form.valid()) {
            form.submit();
        }
    });




    function mf(objects) {
        objects.each(function(index, el) {
            $(el).magnificPopup({
                midClick: true,
                removalDelay: 300,
                mainClass: $(el).data("class") || 'zoom-in',
                closeBtnInside: true,
                showCloseBtn: true,
                enableEscapeKey: true
            });
        });
    }
    mf($('.mfp'));
    if ($('.timer').length) {
        setInterval(function() {
            var mh = 23;
            var mm = 59;
            var ms = 59;
            $('.timer').each(function() {
                var fulltxt = $(this).html().split(' ');
                var d = fulltxt[0];
                var time = fulltxt[2].split(':');
                var h = time[0];
                var m = time[1];
                var s = time[2];
                // console.log(d, h, m, s);
                if (s == 0) {
                    s = ms;
                    if (m == 0) {
                        m = mm;
                        if (h == 0) {
                            h = mh;
                            d = d - 1;
                        } else {
                            h = h - 1;
                            if (h < 10) {
                                h = '0' + h;
                            }
                        }

                    } else {
                        m = m - 1;
                        if (m < 10) {
                            m = '0' + m;
                        }
                    }
                } else {
                    s = s - 1;
                    if (s < 10) {
                        s = '0' + s;
                    }
                }




                $(this).html(d + ' ' + fulltxt[1] + ' ' + h + ':' + m + ':' + s);
            });
        }, 1000);
    }


    $(".dropdown").on("click", function() {
        event.stopPropagation();
        var name = $(this).attr("id"),
            subname = name.split("-");
        name = subname[1] + "-" + subname[0], $("." + name).toggleClass("open")
    });

    $(document).click(function(event) {
        event.stopPropagation();
        if ($(event.target).closest(".open").length) return;
        $(".open").removeClass("open");
    });
    $('#seo').on('click','.seoMore',function(){
        $('#seo').toggleClass('openseo');
    });


    $('nav .mainmenu li>ul').parent().addClass('withSubLevel');
    $('<div class="opensub"></div>').appendTo('.withSubLevel>.libody');

    $('.mainmenu').on('click', 'li.withSubLevel>.libody>.opensub', function() {
        var thisli = $(this).closest('.withSubLevel');
        thisli.toggleClass('dropped');
        thisli.siblings().toggleClass('hidden');
        thisli.parent().toggleClass('current');
        thisli.children('ul').toggleClass('current');
    })

        .on('click', 'li>.close', function() {});
    $('.phones').on('click','.callme-btn', function() {
        if ($('#callme').css('display') == 'none') {
            $('#callme').slideDown();
            $('#Phones').toggleClass('opened');
        } else {
            $('#callme').slideUp();
            $('#Phones').toggleClass('opened');
        }
    }).on('click','.close',function(){
        $('#callme').slideUp();
        $('#Phones').toggleClass('opened');
    });
    if ($('.image-slider').length) {
        var mainsli = $('.image-slider');
        var eff = 'fade';
        var lazy = true;

        if (Modernizr.ie9) {
            eff = 'slide';
            lazy = false;
            $(mainsli.selector + ' .swiper-lazy-preloader').remove();
            $(mainsli.selector + ' .swiper-lazy').each(function(index, el) {
                $(this).attr("src", $(this).attr("data-src"));
            });
        }
        var imgslider = new Swiper(mainsli, {
            autoplay: 5000,
            lazyLoading: lazy,
            preloadImages: !lazy,
            effect: eff,
            slidesPerView: 1,
            lazyLoadingInPrevNext: lazy,
            loop: lazy,
            autoplayDisableOnInteraction: false
        });

        $('#image-slidernext').on('click', function(event) {
            event.stopPropagation();
            imgslider.slideNext()
        });
        $('#image-sliderprev').on('click', function(event) {
            event.stopPropagation();
            imgslider.slidePrev()
        });

    }
    if ($('.delivery').length) {
        var carmoved = false;
        $(window).on('scroll', function() {
            if (!carmoved) {
                if ($(this).scrollTop() + $(this).height() >= $('.delivery').offset().top + $('.delivery').height()) {
                    var deliveryblock = $('.delivery')
                    var btn = deliveryblock.children('.delivery-btn');
                    var car = deliveryblock.children('.car');
                    var newPos = btn.offset().left - car.width() - 20 - deliveryblock.offset().left;
                    car.css('left', newPos);
                    carmoved = true;
                }
            }
        });
    };
    if ($('.filters').length) {
        $('.filters').on('click', '.filterbox', function() {
            $(this).toggleClass('open')
        });
    }


    function mySliderSize(swiper) {
        if (!swiper) {
            return
        }
        var ww = swiper.container.width();

        var elw = $(swiper.container.selector).find('.slide').first().outerWidth();
        cc = Math.floor(ww / elw);
        // console.log(swiper.container.selector);
        // console.log(ww + " / " + elw + "=" + cc);
        swiper.params.slidesPerView = cc;

        return cc;
    }
    $(window).resize(function() {
        carmoved = false;
        rebuildProductPage();
        mySliderSize(flashSaleSlider);
        mySliderSize(tabbed1Slider);
        mySliderSize(tabbed2Slider);
        mySliderSize(NewsNArticles);
        if (tabslis.length) {
            tabbedSliders.onResize();
        }

    });
    var flashSale = $('.flash-sale .slider-container');
    if (flashSale.length) {
        var flashSaleSlider = new Swiper(flashSale, {
            autoplay: 3000,
            // loop: true,
            nextButton: "#flashnext",
            prevButton: "#flashprev",
            onInit: function(swiper) {
                setTimeout(function() {
                    mySliderSize(swiper);
                    swiper.onResize();
                }, 400);
            }
        });
    }
    var tabslis = $('.tabbed-slider>.sliders-container');
    if (tabslis.length) {
        var tabbedSliders = new Swiper(tabslis, {
            onlyExternal: true,
            slidesPerView: 1
        });
    }
    var tabsli1 = $('.slider-container.new-items');
    if (tabsli1.length) {
        var tabbed1Slider = new Swiper(tabsli1, {
            autoplay: 3000,
            // loop: true,
            nextButton: "#tabbednext",
            prevButton: "#tabbedprev",
            onInit: function(swiper) {
                setTimeout(function() {
                    mySliderSize(swiper);
                    swiper.onResize();
                }, 400);
            }
        });
    }
    var tabsli2 = $('.slider-container.popular-items');
    if (tabsli2.length) {

        var tabbed2Slider = new Swiper(tabsli2, {
            autoplay: 3000,
            // loop: true,
            nextButton: "#tabbednext",
            prevButton: "#tabbedprev",
            onInit: function(swiper) {
                setTimeout(function() {
                    mySliderSize(swiper);
                    swiper.onResize();
                }, 400);
            }
        });
    }

    var NewsSli = $('.NewsNArticles .slider-container');
    if (NewsSli.length) {
        var NewsNArticles = new Swiper(NewsSli, {
            // loop: true,
            nextButton: "#articlesnext",
            prevButton: "#articlesprev",
            onInit: function(swiper) {
                setTimeout(function() {
                    mySliderSize(swiper);
                    swiper.onResize();
                }, 400);
            }
        });
    }



    $(".tabbed-slider .tabs .section-name").on('click', function() {
        tabbedSliders.slideTo($(this).index());
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

    if ($('.filterbox').length) {
        $('.filterbox:not(.noscroll) .box-content').mCustomScrollbar({
            theme: "dark"
        });
    };

    if ($('#cost-range-slider').length) {
        $('#cost-range-slider').slider({
            range: true,
            min: parseInt($('#cost-range-slider').attr('data-cost-min'), 10),
            max: parseInt($('#cost-range-slider').attr('data-cost-max'), 10),
            values: [parseInt($('#cost-range-slider').attr('data-cost-min'), 10), parseInt($('#cost-range-slider').attr('data-cost-max'), 10)],
            slide: function(event, ui) {
                $("#costfrom").val(ui.values[0]);
                $("#costto").val(ui.values[1]);
            }
        });
    };

    if ($('#filtertype').length) {
        $('#filtertype').selectmenu();
    };
    if ($('#clear-filters').length) {

        $('#clear-filters').on('click', function() {
            $(".filterbox input[type='checkbox']:checked").removeAttr('checked');
        });
    };

    var productprevcaro = $('.product-preview .carousel');

    if (productprevcaro.length) {
        var productPrevCarousel = new Swiper(productprevcaro, {
            slidesPerView: 3,
            nextButton: '.carousel-wrapper .next',
            prevButton: '.carousel-wrapper .prev',
            preloadImages: false,
            lazyLoading: true,
            lazyLoadingInPrevNext: true

        });
        $(productPrevCarousel.container.selector).on('click', 'img', function() {
            if (!Modernizr.touch) {
                $(".toZoom").removeData();
                $('.zoomContainer').remove();
            }
            $(".toZoom").attr('src', $(this).attr('data-medium-src'));
            var datalarge = $(this).attr('data-large-src')
            $(".toZoom").attr('data-zoom-image', datalarge);
            if (!Modernizr.touch) {
                $(".toZoom").elevateZoom({
                    scrollZoom: true,
                    responsive: true
                });
            }
            $('.frescolinks a.fresco.active').removeClass('active');
            $('.frescolinks a.fresco').each(
                function() {
                    console.log($(this).attr('href'));
                    console.log(datalarge);
                    if ($(this).attr('href') == datalarge) {
                        $(this).addClass('active');
                        return false;
                    }
                });
        });
        $('.toZoom').on('click', function() {
            $('.frescolinks .active').trigger('click');
        });
        if ($('.product-preview').length) {
            $('.product-preview .swiper-wrapper img').each(function(index, el) {
                $("<a class='fresco' data-fresco-group='productfresco' href='" + $(this).attr('data-large-src') + "'>" + index + "<a>").appendTo('.frescolinks');
            });
            $('.frescolinks a.fresco').eq(0).addClass('active');
        }
    };
    if (!Modernizr.touch) {
        $(".toZoom").elevateZoom({
            scrollZoom: true,
            responsive: true
        });
    }



    var tabslist = $('.tabs-block');
    if (tabslist.length) {
        var tabsSlider = new Swiper(tabslist, {
            onlyExternal: true,



        });
    }
    $(".tabs-block").on('click', '.tab-names>li', function() {
        tabsSlider.slideTo($(this).index());
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
    $('.tabcontent').mCustomScrollbar({
        theme: 'dark'

    });


    $('.enterReg').magnificPopup({
        type: 'inline',
        midClick: true,
        removalDelay: 300,
        mainClass: 'zoom-in'
    });

    $('#forget_pass').on('click', function(event) {
        $('#entrForm').removeClass('visForm');
        $('#forgetForm').addClass('visForm');
    });

    $('#remember_pass').on('click', function(event) {
        $('#forgetForm').removeClass('visForm');
        $('#entrForm').addClass('visForm');
    });
    // var orderfrm = $('.orderform');
    // if (orderfrm.length) {
    //     var orderfrmSli = new Swiper(orderfrm, {
    //         onlyExternal: true
    //     });
    $('.wOrder').on('click', function(event) {
        var form = $(this).closest('.wForm');
        form.valid();

        if (form.valid()) {
            form.submit();
            var indx = $(this).closest('.orderstep').index();
            $('.orderform .active').removeClass('active');
            $('.ordertab').eq(indx+1).addClass('active');
            $('.orderstep').eq(indx+1).addClass('active');
        }
    });

    $('.ordertabs .edit').on('click', function() {
        var indx = $(this).closest('.ordertab').index();
        $('.orderform .active').removeClass('active');
        $('.ordertab').eq(indx).addClass('active');
        $('.orderstep').eq(indx).addClass('active');
    });


    /*-------------------------------  responsive EnterPopup  ------------------------------------*/

    $('#enterReg').on('click', '.erTitle', function(event) {
        event.preventDefault();
        if ($(window).width() < 720) {
            if (!$(this).parent().hasClass('wCur')) {
                $('#enterReg .popupBlock').removeClass('wCur').filter($(this).parent()).addClass('wCur');
            }
        }
    });
    /*-------------------------------  lk  ------------------------------------*/
    $('.zakaz_t').magnificPopup({
        type: 'inline',
        midClick: true,
        removalDelay: 300,
        mainClass: 'zoom-in'
    });

    $('#forget_pass').on('click', function(event) {
        $('#entrForm').removeClass('visForm');
        $('#forgetForm').addClass('visForm');
    });

    $('#remember_pass').on('click', function(event) {
        $('#forgetForm').removeClass('visForm');
        $('#entrForm').addClass('visForm');
    });

    if ($(".lk_block").length) {
        $(".lk_block").on('click', '.add_new_addres', function(event) {
            var name = new Date().getTime();
            event.preventDefault();
            $(".addresses").append('<div class="address"><div class="insp">Адрес:</div><div class="wFormRow town"><input type="text" name="a' + name + '" placeholder="Город" data-rule-required="true" data-msg-required="Поле обязательно для заполнения!" value=""></div><div class="wFormRow street"><input type="text" name="b' + name + '" placeholder="Улица" data-rule-required="true" data-msg-required="Поле обязательно для заполнения!" value=""></div><a class="delete" href="#">X</a></div>');
            // $(this).addClass('hide');
        });
        $(".lk_block").on('click', '.delete', function() {
            // $(this).closest(".address").prev(".address").find('.add_new_addres').removeClass('hide');
            $(this).closest(".address").remove();
        });
    }

    if ($(".zakaz").length) {
        $(".zakaz").on('click', '.show_block', function() {
            if ($(this).find('.name').hasClass('open')) {
                $(this).closest("li").find(".un_show_block").stop().slideUp().toggleClass('show');
                $(this).find('.name').removeClass('open');
                $(this).find('.towars_prevue').addClass('show');
            } else {
                $(".name").removeClass('open');
                $(".un_show_block").stop().slideUp().removeClass('show');
                $(this).closest("li").find(".un_show_block").stop().slideToggle().toggleClass('show');
                $(this).find('.name').toggleClass('open');
                $(".towars_prevue").addClass('show');
                $(this).find('.towars_prevue').removeClass('show');
            }
        });
    }


    /*if ($('.toBasket-tbn')) {
        $('.toBasket-btn').on('click', function() {
            $(this).attr('data-mfp-src', '#orderBasket')
            var cost = $(this).siblings('.prices').children('.price').html().split(' ')[0];
            cost = parseInt(cost, 10);
            var count = parseInt($('.basket-count').html().split(' ')[0], 10);
            sum = parseInt($('.basket-sum').html().split(' ')[0], 10);
            $('.basket-count').html(count + 1);
            $('.basket-sum').html(sum + cost + ' UAH');
            $('.basket').addClass('active');
        });
    }*/

    $('#callme .time input').on('change', function() {
        if ($(this).val() > 24) {

            $(this).val(24)
        }
        if ($(this).val() < 0) {
            $(this).val(0)
        }

    });

    $("input[name='customertype']").on('click', function() {
        $('.' + $(this).attr('id')).show();
        $('.' + $(this).attr('id')).siblings('.wForm').hide();
    });
    rebuildProductPage();




});

function rebuildProductPage() {
    if (!$('.productName').length) {
        return
    }
    if ($(window).width() < 720) {
        $('.product-code').prependTo('.Left');
        $('.productName').prependTo('.Left');
        $('.feedbacks').appendTo('.Right');

    } else {
        $('.product-code').prependTo('.Right');
        $('.productName').prependTo('.Right');
        $('.feedbacks').appendTo('.Left');
    }
}




/*-- gmap --*/

function initialize() {
    var latlng = new google.maps.LatLng(50.432278, 30.434730);
    var settings = {
        zoom: 14,
        center: latlng,
        mapTypeControl: false,
        scrollwheel: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        navigationControl: false,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("gmap"), settings);
    var companyPos = latlng;
    // var companyLogo = new google.maps.MarkerImage('pic/map-pointer.png',
    //     new google.maps.Size(59, 82),
    //     new google.maps.Point(0, 0),
    //     new google.maps.Point(29.5, 41)
    // );
    var companyMarker = new google.maps.Marker({
        // icon: companyLogo,
        position: companyPos,
        map: map,
        title: "bronks.com.ua"
    });
}

$(window).load(function() {
    if ($('#gmap').length) {
        console.log('Есть карта');
        initialize();
    }
})