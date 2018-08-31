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

    <link href="{{ mix('auth/css/app.css') }}" rel="stylesheet" type="text/css">
</head>

<body>

@yield('content')

<script src="{{ mix('auth/js/app.js') }}"></script>

</body>
</html>