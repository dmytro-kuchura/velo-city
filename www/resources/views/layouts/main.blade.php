<!DOCTYPE html>
<!--[if (gte IE 9)|!(IE)]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <!-- Basic Page Needs
      ================================================== -->
    <meta charset="utf-8">
    <title>Roadie</title>
    <!-- SEO Meta ================================================== -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="distribution" content="global">
    <meta name="revisit-after" content="2 Days">
    <meta name="robots" content="ALL">
    <meta name="rating" content="8 YEARS">
    <meta name="Language" content="en-us">
    <meta name="GOOGLEBOT" content="NOARCHIVE">
    <!-- Mobile Specific Metas ================================================== -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <!-- CSS ================================================== -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/font-awesome.min.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/jquery-ui.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/owl.carousel.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/fotorama.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/magnific-popup.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/custom.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/responsive.css') }}">
    <link rel="shortcut icon" href="images/favicon.png">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">

    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '858425494500894');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
                   src="https://www.facebook.com/tr?id=858425494500894&ev=PageView&noscript=1"
        /></noscript>
    <!-- End Facebook Pixel Code -->
</head>
<body class="homepage">
<div class="se-pre-con"></div>
{{ Widget::Popup() }}
<div class="main">

    <!-- PRODUCT-POPUP START -->
    {{ Widget::ProductPopup() }}
    <!-- PRODUCT-POPUP END -->

    <!-- HEADER START -->
    {{ Widget::Header() }}
    <!-- HEADER END -->

    <!-- SLIDER STRAT -->
    {{ Widget::Slider() }}
    <!-- SLIDER END -->

    <!-- CONTAIN START -->

    <!--  Featured Products Start  -->
    {{ Widget::FeaturedProducts() }}
    <!--  Featured Products Start  -->

    <!-- Offer of the Week Start -->
    <section class="ptb-70">
        <div class="container">
            <div class="row m-0">
                <div class="col-xl-6 p-0">
                    <div class="offer-img">
                        <img src="/images/offer-img.jpg" alt="Roadie">
                    </div>
                </div>
                <div class="col-xl-6 gray-bg center-sm p-0">
                    <div class="offer-detail">
                        <div class="row">
                            <div class="col-12 ">
                                <div class="heading-part mb-30 mb-sm-15">
                                    <h2 class="main_title heading"><span>Offer of the Week</span></h2>
                                </div>
                            </div>
                        </div>
                        <div class="offer-inner-details">
                            <div class="offer-title">Welcome To Roadie Bicycles Store 20% off</div>
                            <div class="offer-slogan">Hurry ! Don’t miss it</div>
                        </div>
                        <div class="item-offer-clock">
                            <ul class="countdown-clock">
                                <li>
                                    <span class="days">00</span>
                                    <p class="days_ref">days</p>
                                </li>
                                <li class="seperator">:</li>
                                <li>
                                    <span class="hours">00</span>
                                    <p class="hours_ref">hrs</p>
                                </li>
                                <li class="seperator">:</li>
                                <li>
                                    <span class="minutes">00</span>
                                    <p class="minutes_ref">min</p>
                                </li>
                                <li class="seperator">:</li>
                                <li>
                                    <span class="seconds">00</span>
                                    <p class="seconds_ref">sec</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Offer of the Week End -->

    <!-- Banner Start -->
    {{ Widget::Banner() }}
    <!-- Banner End -->

    <!--  Featured Products Slider Block Start  -->
    <div class="featured-product ptb-70">
        <div class="container">
            <div class="product-listing">
                <div class="row">
                    <div class="col-12">
                        <div class="heading-part align-center mb-30">
                            <h2 class="main_title heading">Our Products</h2>
                            <div id="tabs" class="category-bar mt-20">
                                <ul class="tab-stap">
                                    <li><a class="tab-step1 selected" title="step1">Special</a></li>
                                    <li>-</li>
                                    <li><a class="tab-step2" title="step2">Most Viewed</a></li>
                                    <li>-</li>
                                    <li><a class="tab-step3" title="step3">Latest</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pro_cat tab_content ">
                    <div id="items">
                        <div class="">
                            <ul>
                                <li>
                                    <div id="data-step1" class="items-step1 product-slider-main position-r selected" data-temp="tabdata">
                                        <div class="tab_cat">
                                            <div class="row">
                                                <div class="owl-carousel tab_slider">
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label sale-label"><span>Sale</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/1.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item sold-out">
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/2.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label new-label"><span>New</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/3.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label new-label"><span>New</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/4.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/5.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label sale-label"><span>Sale</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/6.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label sale-label"><span>Sale</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/7.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label new-label"><span>New</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/8.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/9.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div id="data-step2" class="items-step2 product-slider-main position-r" data-temp="tabdata">
                                        <div class="tab_cat">
                                            <div class="row">
                                                <div class="owl-carousel tab_slider">
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label new-label"><span>New</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/10.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label sale-label"><span>Sale</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/11.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item  sold-out">
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/12.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label new-label"><span>New</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/13.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/14.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label sale-label"><span>Sale</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/15.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label sale-label"><span>Sale</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/16.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label new-label"><span>New</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/17.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/18.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div id="data-step3" class="items-step3 product-slider-main position-r" data-temp="tabdata">
                                        <div class="tab_cat">
                                            <div class="row">
                                                <div class="owl-carousel tab_slider">
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label sale-label"><span>Sale</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/14.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label new-label"><span>New</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/3.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/8.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item sold-out">
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/2.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/4.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label sale-label"><span>Sale</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/6.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label sale-label"><span>Sale</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/17.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="main-label new-label"><span>New</span></div>
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/11.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <div class="product-item">
                                                            <div class="product-image">
                                                                <a href="product-page.html"> <img src="/images/5.jpg" alt="Roadie"> </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                                                    </div>
                                                                    <div class="rating-summary-block">
                                                                        <div class="rating-result" title="53%"> <span style="width:53%"></span> </div>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">$520.00</span>
                                                                        <del class="price old-price">$620.00</del>
                                                                    </div>
                                                                </div>
                                                                <div class="product-detail-inner">
                                                                    <div class="detail-inner-left">
                                                                        <ul>
                                                                            <li class="pro-cart-icon">
                                                                                <form>
                                                                                    <button title="Add to Cart"></button>
                                                                                </form>
                                                                            </li>
                                                                            <li class="pro-wishlist-icon"><a title="Wishlist" href="wishlist.html"></a></li>
                                                                            <li class="pro-compare-icon"><a title="Compare" href="compare.html"></a></li>
                                                                            <li class="pro-quick-view-icon"><a title="quick-view" href="#product_popup" class="popup-with-product"></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--  Featured Products Slider Block End  -->

    <!-- Blog/News Start -->
    {{ Widget::Blog() }}
    <!-- Blog/News End -->

    <!--  Site Services Features Block Start  -->
    {{ Widget::Services() }}
    <!--  Site Services Features Block End  -->

    <!-- Brand logo block Start  -->
    <div class="brand-logo ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12 ">
                    <div class="heading-part align-center mb-30">
                        <h2 class="main_title heading"><span>Our Brands</span></h2>
                    </div>
                </div>
            </div>
            <div class="row brand">
                <div class="col-md-12">
                    <div id="brand-logo" class="owl-carousel align_center">
                        <div class="item"><a href="javascript:void(0)"><img src="/images/brand1.png" alt="Roadie"></a></div>
                        <div class="item"><a href="javascript:void(0)"><img src="/images/brand2.png" alt="Roadie"></a></div>
                        <div class="item"><a href="javascript:void(0)"><img src="/images/brand3.png" alt="Roadie"></a></div>
                        <div class="item"><a href="javascript:void(0)"><img src="/images/brand4.png" alt="Roadie"></a></div>
                        <div class="item"><a href="javascript:void(0)"><img src="/images/brand5.png" alt="Roadie"></a></div>
                        <div class="item"><a href="javascript:void(0)"><img src="/images/brand6.png" alt="Roadie"></a></div>
                        <div class="item"><a href="javascript:void(0)"><img src="/images/brand7.png" alt="Roadie"></a></div>
                        <div class="item"><a href="javascript:void(0)"><img src="/images/brand8.png" alt="Roadie"></a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Brand logo block End  -->

    <!-- CONTAINER END -->

    <!-- News Letter Start -->
    {{ Widget::News() }}
    <!-- News Letter End -->

    <!-- FOOTER START -->
    {{ Widget::Footer() }}
    <!-- FOOTER END -->
</div>
<script src="{{ asset('js/jquery-1.12.3.min.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/jquery.downCount.js') }}"></script>
<script src="{{ asset('js/jquery-ui.min.js') }}"></script>
<script src="{{ asset('js/fotorama.js') }}"></script>
<script src="{{ asset('js/jquery.magnific-popup.js') }}"></script>
<script src="{{ asset('js/owl.carousel.min.js') }}"></script>
<script src="{{ asset('js/custom.js') }}"></script>

{{--<script>--}}
    {{--/* ------------ Newslater-popup JS Start ------------- */--}}
    {{--$(window).load(function() {--}}
        {{--$.magnificPopup.open({--}}
            {{--items: {src: '#newslater-popup'},type: 'inline'}, 0);--}}
    {{--});--}}
    {{--/* ------------ Newslater-popup JS End ------------- */--}}
{{--</script>--}}

</body>
</html>
