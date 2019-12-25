<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>VeloCity | Авторизация</title>
    <meta name="description" content="Elisyam is a Web App and Admin Dashboard Template built with Bootstrap 4">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
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
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="assets/img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png">
    <!-- Stylesheet -->
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/auth.css') }}"/>
    <!-- csrf-token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body class="bg-white">
<div id="preloader">
    <div class="canvas">
        <img src="/images/logo-new.png" alt="logo" class="loader-logo">
        <div class="spinner"></div>
    </div>
</div>
<div class="container-fluid no-padding h-100">
    <div class="row flex-row h-100 bg-white">
        @yield('content')
    </div>
</div>
<script src="{{ asset('/js/auth.js') }}"></script>
</body>
</html>
