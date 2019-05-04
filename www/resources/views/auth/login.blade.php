@extends('layouts.pages')

@section('content')
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
                                            <label for="login-email">Email</label>
                                            <input id="login-email" type="email" required placeholder="Ваш Email">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="input-box">
                                            <label for="login-pass">Пароль</label>
                                            <input id="login-pass" type="password" required
                                                   placeholder="Ваш пароль">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="check-box left-side">
                                          <span>
                                            <input type="checkbox" name="remember_me" id="remember_me" class="checkbox">
                                            <label for="remember_me">Запомнить меня</label>
                                          </span>
                                        </div>
                                        <button name="submit" type="submit" class="btn-color right-side">Log In</button>
                                    </div>
                                    <div class="col-12">
                                        @if (Route::has('password.request'))
                                            <a title="Forgot Password" class="forgot-password mtb-20"
                                               href="{{ route('password.request') }}">Забыли пароль?</a>
                                            <hr>
                                        @endif
                                    </div>
                                    <div class="col-12">
                                        <div class="new-account align-center mt-20">
                                            <span>Новый пользователь?</span>
                                            <a class="link" title="Register with Roadie"
                                               href="/register">Регистрация</a>
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
