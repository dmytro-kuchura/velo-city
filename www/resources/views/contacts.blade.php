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
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6632.248000703498!2d151.265683!3d-33.7832959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12abc7edcbeb07%3A0x5017d681632bfc0!2sManly+Vale+NSW+2093%2C+Ukraine!5e0!3m2!1sen!2sin!4v1433329298259" style="border:0"></iframe>
    </div>
@endsection