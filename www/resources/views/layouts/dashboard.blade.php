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

    <link rel="stylesheet" href="{{ asset('/dashboard/css/app.css') }}">
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

<script src="{{ asset('/dashboard/js/app.js') }}"></script>
</body>
</html>