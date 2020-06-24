<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>VeloCity | Панель Администратора</title>
    <!-- Google Fonts -->
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
    <script>
        WebFont.load({
            google: {"families":["Montserrat:400,500,600,700","Noto+Sans:400,700"]},
            active: function() {
                sessionStorage.fonts = true;
            }
        });
    </script>
    <!-- Stylesheet -->
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/dashboard.css') }}"/>
</head>
<body id="page-top">

<div id="preloader">
    <div class="canvas">
        <img src="/images/logo-new.png" alt="logo" class="loader-logo">
        <div class="spinner"></div>
    </div>
</div>

<div class="page" id="dashboard">
    @widget('dashboardHeader')
    <div class="page-content d-flex align-items-stretch">
        @widget('dashboardSidebar')
        <div class="content-inner">

            @yield('content')

            @widget('dashboardFooter')
        </div>
    </div>
</div>

<script src="{{ asset('/js/custom.js') }}"></script>
<script src="{{ asset('/js/dashboard.js') }}"></script>
</body>
</html>
