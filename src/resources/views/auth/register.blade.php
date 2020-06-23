@extends('layouts.main')

@section('content')
    @widget('breadcrumbs')

    <section class="checkout-section ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="row justify-content-center">
                        <div class="col-xl-8 col-lg-8 col-md-8 ">
                            <div class="row">
                                <div class="col-12 mb-20">
                                    <div class="heading-part heading-bg">
                                        <h2 class="heading">Регистрация нового пользователя</h2>
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
                                                    <label for="name" class="col-lg-3 control-label">Ваше имя</label>
                                                    <div class="col-lg-9">
                                                        <input type="text" class="form-control @error('name') is-invalid @enderror" name="name" id="name" required placeholder="Ваше имя">
                                                    </div>

                                                    @error('name')
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                        </span>
                                                    @enderror
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="input-box">
                                                <div class="row">
                                                    <label for="email" class="col-lg-3 control-label">Email address</label>
                                                    <div class="col-lg-9">
                                                        <input type="email" class="form-control @error('password') is-invalid @enderror" name="email" id="email" required placeholder="Email">
                                                    </div>

                                                    @error('email')
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                        </span>
                                                    @enderror
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="your-address">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="heading-part line-bottom ">
                                                <h2 class="form-title heading">Пароль</h2>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="input-box">
                                                <div class="row">
                                                    <label for="password" class="col-lg-3 control-label">Пароль</label>
                                                    <div class="col-lg-9">
                                                        <input type="password" class="form-control @error('password') is-invalid @enderror" name="password" id="password" required placeholder="Введите Ваш пароль">
                                                    </div>

                                                    @error('password')
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                        </span>
                                                    @enderror
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="input-box">
                                                <div class="row">
                                                    <label for="password_confirmation" class="col-lg-3 control-label">Повторите пароль</label>
                                                    <div class="col-lg-9">
                                                        <input type="password" class="form-control @error('password_confirmation') is-invalid @enderror" name="password_confirmation" id="password_confirmation" required placeholder="Повторите Ваш пароль">
                                                    </div>

                                                    @error('password_confirmation')
                                                    <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                        </span>
                                                    @enderror
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
                                                  <input type="checkbox" name="remember" id="remember" class="checkbox">
                                                  <label for="remember">Запомнить меня</label>
                                                </span>
                                            </div>
                                            <button type="submit" class="btn-color right-side">Регистрация</button>
                                        </div>
                                        <div class="col-12">
                                            <hr>
                                            <div class="new-account align-center mt-20">
                                                <span>Если Вы были зарегистрированы ранее?</span>
                                                <a class="link" title="Авторизация" href="{{ route('login') }}">Авторизуйтесь</a>
                                            </div>
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
