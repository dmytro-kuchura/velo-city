<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Admin Dashboard" name="description"/>
    <meta content="ThemeDesign" name="author"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Velocity - Admin Dashboard</title>

    <link rel="shortcut icon" href="assets/images/favicon.ico">

    <link rel="stylesheet" href="{{ asset('/dashboard/css/morris.css') }}">

    <link href="{{ asset('/dashboard/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('/dashboard/css/icons.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('/dashboard/css/style.css') }}" rel="stylesheet" type="text/css">

    <link href="{{ asset('/dashboard/css/app.css') }}" rel="stylesheet" type="text/css">
</head>
<body class="fixed-left">

<div id="wrapper">
    @widget('AdminTopbar')

    @widget('AdminLeftMenu')
    <div class="content-page" id="app">
        @yield('content')

        <footer class="footer">
            © 2018 Velocity - All Rights Reserved.
        </footer>

    </div>
</div>

<script src="{{ asset('/dashboard/js/jquery.min.js') }}"></script>
<script src="{{ asset('/dashboard/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('/dashboard/js/modernizr.min.js') }}"></script>
<script src="{{ asset('/dashboard/js/detect.js') }}"></script>
<script src="{{ asset('/dashboard/js/fastclick.js') }}"></script>
<script src="{{ asset('/dashboard/js/jquery.slimscroll.js') }}"></script>
<script src="{{ asset('/dashboard/js/jquery.blockUI.js') }}"></script>
<script src="{{ asset('/dashboard/js/waves.js') }}"></script>
<script src="{{ asset('/dashboard/js/wow.min.js') }}"></script>
<script src="{{ asset('/dashboard/js/jquery.nicescroll.js') }}"></script>
<script src="{{ asset('/dashboard/js/jquery.scrollTo.min.js') }}"></script>

<script src="{{ asset('/dashboard/js/main.js') }}"></script>

<script src="{{ asset('/dashboard/js/app.js') }}"></script>
</body>
</html>