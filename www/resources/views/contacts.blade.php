@extends('layouts.main')

@section('title', 'Контакты Velo-City')
@section('description', 'Велозапчасти и велоаксессуары с доставкой по Украине. Велозапчасти купить можно в нашем интернет магазине велозапчастей. Всего пару кликов и товар будет доставлен в срок!')
@section('keywords', 'велозапчасти, велоаксессуары, велозапчасти купить, магазин велозапчастей, велозапчасти интернет, велозапчасти интернет магазин')

@section('content')
    <div class="breadcrumbs">
        <div class="container">
            <div class="breadcrumbs-main">
                <ol class="breadcrumb">
                    <li><a href="{{ route('home') }}">Главная</a></li>
                    <li class="active">Контакты</li>
                </ol>
            </div>
        </div>
    </div>

    <div class="contact">
        <div class="container">
            <div class="contact-top heading">
                <h2>Контакты</h2>
            </div>
            <div class="contact-text">
                <div class="col-md-3 contact-left">
                    <div class="address">
                        <h3>Адрес:</h3>
                        <h4>Магазин Velo-City <span>ул. Крымская, 137</span> г. Херсон, Херсонская область.</h4>
                        <h5>+380 50 570 1900</h5>
                        <p><a href="mailto:contacts@velo-city.online">contacts@velo-city.online</a></p>
                    </div>
                </div>
                <div class="col-md-9 contact-right">
                    <form>
                        <input type="text" placeholder="Имя">
                        <input type="text" placeholder="Телефон">
                        <input type="text"  placeholder="Email">
                        <textarea placeholder="Сообщение" required=""></textarea>
                        <div class="submit-btn">
                            <input type="submit" value="ОТПРАВИТЬ">
                        </div>
                    </form>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>

    <div class="map">
        <iframe src="https://maps.google.com/maps?q=Kherson%2C%20VELO-CITY&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    </div>
@endsection