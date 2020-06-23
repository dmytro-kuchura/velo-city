@extends('layouts.main')

@section('content')
    @widget('breadcrumbs')

    <section class="checkout-section ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <div class="account-sidebar account-tab mb-sm-30">
                        <div class="dark-bg tab-title-bg">
                            <div class="heading-part">
                                <div class="sub-title"><span></span> Меню пользователя</div>
                            </div>
                        </div>
                        <div class="account-tab-inner">
                            <ul class="account-tab-stap">
                                <li id="step1" class="active">
                                    <a href="javascript:void(0)">
                                        Мой аккаунт<i class="fa fa-angle-right"></i>
                                    </a>
                                </li>
                                <li id="step2">
                                    <a href="javascript:void(0)">
                                        Список заказов<i class="fa fa-angle-right"></i>
                                    </a>
                                </li>
                                <li id="step3">
                                    <a href="javascript:void(0)">
                                        Смена пароля<i class="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div id="data-step1" class="account-content" data-temp="tabdata">
                        <div class="row">
                            <div class="col-12">
                                <div class="heading-part heading-bg mb-30">
                                    <h2 class="heading m-0">Мой аккаунт</h2>
                                </div>
                            </div>
                        </div>
                        <div class="mb-30">
                            <div class="row">
                                <div class="col-12">
                                    <div class="heading-part">
                                        <h3 class="sub-heading">Вы авторизованы как, {{ $user->name }}</h3>
                                    </div>
                                    <p>
                                        На это странице Вы сможете сменить свои персональные данные.
                                    </p>
                                </div>
                            </div>
                            <form class="main-form full" method="POST" action="{{ route('profile.change') }}">
                                @csrf
                                <div class="row">
                                    <div class="col-12">
                                        <div class="input-box">
                                            <label for="name">Ваше имя</label>
                                            <input type="text" placeholder="Ваше имя" required
                                                   value="{{ $user->name }}"
                                                   name="name" id="name">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-box">
                                            <label for="last_name">Ваша фамилия</label>
                                            <input type="text" placeholder="Введите вашу фамилию" required
                                                   value="{{ $user->last_name ?? '' }}"
                                                   name="last_name" id="last_name">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-box">
                                            <label for="middle_name">Ваше отчество</label>
                                            <input type="text" placeholder="Введите ваше отчество" required
                                                   value="{{ $user->middle_name ?? '' }}"
                                                   name="middle_name" id="middle_name">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="input-box">
                                            <label for="name">Ваш телефон</label>
                                            <input type="text" placeholder="Ваш телефон" required
                                                   value="{{ $user->phone ?? '' }}"
                                                   name="name" id="name">
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <button class="btn-color" type="submit">Сменить данные</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="data-step2" class="account-content" data-temp="tabdata" style="display:none">
                        <div id="form-print" class="admission-form-wrapper">
                            <div class="row">
                                <div class="col-12">
                                    <div class="heading-part heading-bg mb-30">
                                        <h2 class="heading m-0">Список заказов</h2>
                                    </div>
                                </div>
                            </div>
                            @foreach($orders as $order)
                                <div class="row">
                                    <div class="col-12">
                                        <div class="cart-item-table commun-table">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                    <tr>
                                                        <th colspan="4">
                                                            <ul>
                                                                <li>
                                                                    <span>Заказ создан</span>
                                                                    <span>{{ strftime("%d %B , %Y", strtotime($order->created_at)) }}</span>
                                                                </li>
                                                                <li class="price-box">
                                                                    <span>Итого</span>
                                                                    <span class="price">₴ {{ $order->total }}</span>
                                                                </li>
                                                                <li>
                                                                    <span>№ Заказа</span>
                                                                    <span>#{{ $order->id }}</span>
                                                                </li>
                                                            </ul>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    @foreach($order->items as $item)
                                                        <tr>
                                                            <td>
                                                                <a href="{{ route('shop.item', ['alias' => $item->product->alias, 'id' => $item->product->id]) }}">
                                                                    <div class="product-image">
                                                                        <img
                                                                            src="{{ $item->product->image ? $item->product->image : '/images/no-image.png' }}"
                                                                            alt="{{ $item->product->name }}">
                                                                    </div>
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <div class="product-title">
                                                                    <a href="product-page.html">
                                                                        {{ $item->product->name }}
                                                                    </a>
                                                                </div>
                                                                <div class="product-info-stock-sku m-0">
                                                                    <div>
                                                                        <label>Кол-во: </label>
                                                                        <span
                                                                            class="info-deta">{{ $item->count }}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="base-price price-box">
                                                                    <span class="price">₴ {{ $item->cost }}</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    @endforeach
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    <div id="data-step3" class="account-content" data-temp="tabdata" style="display:none">
                        <div class="row">
                            <div class="col-12">
                                <div class="heading-part heading-bg mb-30">
                                    <h2 class="heading m-0">Смена пароля</h2>
                                </div>
                            </div>
                        </div>
                        <form class="main-form full" method="POST" action="{{ route('profile.change.password') }}">
                            @csrf
                            <div class="row">
                                <div class="col-12">
                                    <div class="input-box">
                                        <label for="password">Старый пароль</label>
                                        <input type="password" placeholder="Старый пароль" required
                                               name="password" id="password">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-box">
                                        <label for="new_password">Новый пароль</label>
                                        <input type="password" placeholder="Введите новый пароль" required
                                               name="new_password" id="new_password">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-box">
                                        <label for="new_password_confirmation">Подтверждение нового пароля</label>
                                        <input type="password" placeholder="Подтвердите новый пароль" required
                                               name="new_password_confirmation" id="new_password_confirmation">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn-color" type="submit">Сменить пароль</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

@endsection
