<!DOCTYPE html>
<!--[if (gte IE 9)|!(IE)]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <!-- Basic Page Needs -->
    <title>@yield('title')</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="description" content="@yield('description')">
    <meta name="keywords" content="@yield('keywords')">

    <meta property="og:locale" content="ru_RU"/>
    <meta property="og:title" content="@yield('title')"/>
    <meta property="og:description" content="@yield('description')"/>
    <meta property="og:image" content="{{ asset('/images/logo-new.png') }}"/>
    <meta property="og:url" content="{{ url(Request::url()) }}"/>
    <meta property="og:site_name" content="Velo - City"/>

    <meta itemprop="name" content="@yield('title')"/>
    <meta itemprop="description" content="@yield('description')"/>
    <meta itemprop="image" content="{{ asset('/images/logo-new.png') }}"/>

    <meta name="site-created" content="2020/04/15">

    <meta name="distribution" content="global">
    <meta name="revisit-after" content="5 Days">
    <meta name="robots" content="ALL">
    <meta name="rating" content="general">
    <meta name="Language" content="{{ str_replace('_', '-', app()->getLocale()) }}">
    <!-- Mobile Specific Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <!-- css -->
    <link rel="stylesheet" type="text/css" href="/css/app.css"/>
    <!-- sitemap.xml -->
    <link href='{{ url('sitemap.xml') }}' rel='alternate' title='Sitemap' type='application/rss+xml'/>
    <!-- canonical -->
    <link rel="canonical" href="{{ url(Request::url()) }}" />
    <!-- csrf-token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="shortcut icon" href="/images/favicon.png">
    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-touch-icon-114x114.png">

    @if(config('app.env') !== 'local')
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-125280840-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-125280840-1');
        </script>
    @endif
</head>
<body class="homepage">
<div class="se-pre-con"></div>
<div id="newslater-popup" class="mfp-hide white-popup-block open align-center">
    <div class="nl-popup-main">
        <div class="nl-popup-inner">
            <div class="newsletter-inner">
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-8">
                        <h2 class="main_title">join now</h2>
                        <span>before it's too late</span>
                        <p>Sing up now to receive this exclusive offer for a limited time only!</p>
                        <form>
                            <input type="email" placeholder="Email Here...">
                            <button class="btn-black" title="Subscribe">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="main" id="app">
    @widget('productsPopup')

    @widget('header')
    @widget('searchWrap')

     @yield('content')

    @widget('footer')
</div>

<script src="/js/app.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>

{{--<script>--}}
{{--    /* ------------ Newslater-popup JS Start ------------- */--}}
{{--    $(window).load(function() {--}}
{{--        $.magnificPopup.open({--}}
{{--            items: {src: '#newslater-popup'},type: 'inline'}, 0);--}}
{{--    });--}}
{{--    /* ------------ Newslater-popup JS End ------------- */--}}
{{--</script>--}}

</body>
</html>
