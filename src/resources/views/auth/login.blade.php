@extends('layouts.main')

@section('content')
    @widget('breadcrumbs')

    <section class="checkout-section ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="row justify-content-center">
                        <div class="col-xl-6 col-lg-8 col-md-8 ">
                            <form class="main-form full" method="POST" action="{{ route('login') }}">
                                @csrf
                                <div class="row">
                                    <div class="col-12 mb-20">
                                        <div class="heading-part heading-bg">
                                            <h2 class="heading">Авторизация</h2>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="input-box">
                                            <label for="email">Email</label>
                                            <input id="email" name="email" type="email" required placeholder="Email адрес">

                                            @error('email')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="input-box">
                                            <label for="password">Пароль</label>
                                            <input id="password" name="password" type="password" required placeholder="Введите Ваш пароль">

                                            @error('password')
                                            <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="check-box left-side">
                                            <span>
                                                <input type="checkbox" name="remember" id="remember" class="checkbox">
                                                <label for="remember">Запомнить меня</label>
                                            </span>
                                        </div>
                                        <button type="submit" class="btn-color right-side">Авторизоваться</button>
                                    </div>
                                    <div class="col-12">
                                        <a title="Забыли пароль" class="forgot-password mtb-20" href="javascript:void(0)">
                                            Забыли пароль?
                                        </a>
                                        <hr>
                                    </div>
                                    <div class="col-12">
                                        <div class="new-account align-center mt-20">
                                            <span>Новый пользователь?</span>
                                            <a class="link" title="Register with Roadie" href="{{ route('register') }}">
                                                Зарегистрироваться
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
