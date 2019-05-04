<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

    <meta charset="utf-8">
    <title>Velo - City</title>
    <!-- SEO Meta ================================================== -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="distribution" content="global">
    <meta name="revisit-after" content="2 Days">
    <meta name="robots" content="ALL">
    <meta name="rating" content="8 YEARS">
    <meta name="Language" content="RU-ru">
    <meta name="GOOGLEBOT" content="NOARCHIVE">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Mobile Specific Metas ================================================== -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <!-- CSS ================================================== -->
    <link rel="stylesheet" type="text/css" href="/css/font-awesome.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="/css/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="/css/owl.carousel.css">
    <link rel="stylesheet" type="text/css" href="/css/fotorama.css">
    <link rel="stylesheet" type="text/css" href="/css/magnific-popup.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/css/responsive.css">
    <link rel="shortcut icon" href="/images/favicon.png">
    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-touch-icon-114x114.png">
</head>
<body class="homepage">
<div class="se-pre-con"></div>
{{ Widget::run('Newslater') }}
<div class="main">

    <!-- PRODUCT-POPUP START -->
    {{ Widget::run('Popup') }}
    <!-- PRODUCT-POPUP END -->

    <!-- HEADER START -->
    {{ Widget::run('Header') }}
    <!-- HEADER END -->

    <!-- CONTAINER START -->

    <!-- Bread Crumb START -->
    {{ Widget::run('Breadcrumbs') }}
    <!-- Bread Crumb END -->

    @yield('content')

    <!-- CONTAINER END -->

    <!-- FOOTER START -->
    {{ Widget::run('Footer') }}
    <!-- FOOTER END -->
</div>
<script src="/js/jquery-1.12.3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
<script src="/js/bootstrap.js"></script>
<script src="/js/jquery.downCount.js"></script>
<script src="/js/jquery-ui.min.js"></script>
<script src="/js/fotorama.js"></script>
<script src="/js/jquery.magnific-popup.js"></script>
<script src="/js/owl.carousel.min.js"></script>
<script src="/js/custom.js"></script>

</body>
</html>
