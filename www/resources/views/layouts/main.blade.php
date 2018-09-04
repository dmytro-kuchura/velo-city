<!DOCTYPE html>
<html lang="ru-ru" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>VeloCity | Главная</title>
    <meta name="description" lang="ru-ru" content="">
    <meta name="keywords" lang="ru-ru" content="студия wezom, разработка сайтов">
    <meta name="keywords" lang="en-us" content="studio wezom, web development">
    <meta name="author" lang="ru-ru" content="">

    <meta property="og:title" content="Заголовок страницы">
    <meta property="og:type" content="website"> <!-- тип объекта - не изменять -->
    <meta property="og:url" content="http://site.com/articles/example"> <!-- url текущей страницы -->
    <meta property="og:image" content="http://site.compic/image.jpg"> <!-- изображение размером не менее 200х200 -->
    <meta property="og:description" content="Short description text."> <!-- краткий текст (новости, товара и т.д) -->
    <meta property="og:site_name" content="site.com"> <!-- домен сайта -->

    <!-- АДАПТАЦИЯ -->
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="viewport" content="target-densitydpi=device-dpi">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">

    <!-- saved from url=(0014)about:internet -->
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="address=no">
    <link rel="apple-touch-icon" sizes="57x57" href="favicons/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="favicons/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="favicons/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="favicons/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="favicons/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="favicons/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="favicons/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="favicons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="favicons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="favicons/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="favicons/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="favicons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="favicons/manifest.json">
    <link rel="shortcut icon" href="favicons/favicon.ico">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="favicons/mstile-144x144.png">
    <meta name="msapplication-config" content="favicons/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">
    <meta name="apple-mobile-web-app-title" content="Title">
    <meta name="application-name" content="Title">
    <meta name="msapplication-tooltip" content="Description">

    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    <style>
        .seoTxt {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
        }
    </style>
    <!-- АДАПТАЦИЯ -->
    <!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
    <script src="js/jquery-1.11.0.min.js"></script>
    <script src="js/modernizr.js"></script>
    <script src="js/jquery-ui.min.js"></script>

    <script src="js/plugins.js"></script>
    <script src="js/init.js"></script>
    <script src="js/basket.js"></script>
    <script src="http://maps.google.com/maps/api/js"></script>


</head>

<body>
<div class="wWrapper">
    @widget('Header')
    @widget('Menu')

    <div class="wContainer">

        @widget('Slider')

        <div class="inline-logo">
            <div class="logo">
                <span class="logo-big"><a href="/"></a></span>
                <span class="logo-text">интернет магазин спортивной одежды и обуви</span>
            </div>
        </div>
        <div class="wSize">
            @widget('Sale')

            <section class="delivery">
                <div class="title">ДОСТАВКА ПО ВСЕЙ ТЕРРИТОРИИ УКРАИНЫ</div>
                <div class="delivery-btn">УЗНАТЬ БОЛЬШЕ</div>
                <div class="car"></div>
            </section>

            @widget('Popular')
            @widget('News')

            <div class="clear"></div>
        </div>
    </div>
</div>
@widget('Footer')
@widget('Hidden')
</body>
</html>