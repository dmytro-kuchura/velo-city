@extends('layouts.pages')

@section('content')
    <section class="checkout-section ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="row justify-content-center">
                        <div class="col-xl-8 col-lg-8 col-md-8 ">
                            <div class="row">
                                <div class="col-12 mb-20">
                                    <div class="heading-part heading-bg">
                                        <h2 class="heading">Регистрация</h2>
                                    </div>
                                </div>
                            </div>
                            <form class="main-form full" method="POST" action="{{ route('register') }}">
                                @csrf

                                <div class="personal-details mb-30">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="heading-part line-bottom ">
                                                <h2 class="form-title heading">Персональные данные</h2>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="input-box">
                                                <div class="row">
                                                    <label for="l-name" class="col-lg-3 control-label">Ваше имя</label>
                                                    <div class="col-lg-9">
                                                        <input type="text" class="form-control" name="name" required placeholder="Ваше имя">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="input-box">
                                                <div class="row">
                                                    <label for="login-email" class="col-lg-3 control-label">Ваш Email</label>
                                                    <div class="col-lg-9">
                                                        <input type="email" class="form-control" name="email" required placeholder="Ваш Email">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="your-address">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="heading-part line-bottom ">
                                                <h2 class="form-title heading">Ваш пароль</h2>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="input-box">
                                                <div class="row">
                                                    <label for="login-pass" class="col-lg-3 control-label">Пароль</label>
                                                    <div class="col-lg-9">
                                                        <input type="password" class="form-control" name="password" required placeholder="Введите Ваш пароль">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="input-box">
                                                <div class="row">
                                                    <label for="re-enter-pass" class="col-lg-3 control-label">Подтверждение пароля</label>
                                                    <div class="col-lg-9">
                                                        <input type="password" class="form-control" name="password_confirmation" required placeholder="Введите повторно Ваш пароль">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="Submit-btn">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="check-box left-side mb-20">
                                                <span>
                                                  <input type="checkbox" name="remember_me" id="remember_me" class="checkbox">
                                                  <label for="remember_me">Remember Me</label>
                                                </span>
                                            </div>
                                            <button name="submit" type="submit" class="btn-color right-side">Зарегистрироваться</button>
                                        </div>
                                        <div class="col-12">
                                            <hr>
                                            <div class="new-account align-center mt-20"> <span>Уже есть аккаунт? Так может тогда</span> <a class="link" title="авторизируемся" href="/login">авторизируемся</a>? </div>
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
