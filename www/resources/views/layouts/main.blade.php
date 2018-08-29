<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <meta name="description" content="@yield('description')"/>
    <meta name="keywords" content="@yield('keywords')"/>

    <script type="application/x-javascript">
        addEventListener("load", function () {
            setTimeout(hideURLbar, 0);
        }, false);

        function hideURLbar() {
            window.scrollTo(0, 1);
        }
    </script>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css" media="all"/>

    <script src="/js/jquery-1.11.0.min.js"></script>
    <script src="/js/responsiveslides.min.js"></script>
</head>
<body>
<div class="top-header">
    <div class="container">
        <div class="top-header-main">
            <div class="col-md-6 top-header-left">
                <div class="drop">

                    <div class="box">
                        <select tabindex="4" class="dropdown drop">
                            <option value="" class="label">Dollar :</option>
                            <option value="1">Dollar</option>
                            <option value="2">Euro</option>
                        </select>
                    </div>

                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="col-md-6 top-header-left">
                <div class="cart box_1">
                    <a href="#">
                        <div class="total">
                            <span class="simpleCart_total"></span></div>
                        <img src="images/cart-1.png" alt=""/>
                    </a>
                    <p><a href="javascript:;" class="simpleCart_empty">Корзина пуста</a></p>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>
<div class="logo">
    <a href="{{ route('home') }}">
        <img src="/images/logo.png">
    </a>
</div>
@widget('Menu')
@yield('content')
@widget('Information')
@widget('Footer')
</body>
</html>