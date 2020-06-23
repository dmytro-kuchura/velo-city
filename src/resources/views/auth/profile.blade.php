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
                                        Lorem ipsum dolor sit amet, consec adipiscing elit. Donec eros tellus, nec consec
                                        elit. Donec eros tellus laoreet sit amet.<a class="account-link"
                                                                                    id="subscribelink"
                                                                                    href="javascript:void(0)">Click
                                            Here</a></p>
                                </div>
                            </div>
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
                                                                    <span>17 December 2016</span>
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
                                                                        <img src="{{ $item->product->image ? $item->product->image : '/images/no-image.png' }}"
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
                                                                        <span class="info-deta">{{ $item->count }}</span>
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
                                    <h2 class="heading m-0">Change Password</h2>
                                </div>
                            </div>
                        </div>
                        <form class="main-form full">
                            <div class="row">
                                <div class="col-12">
                                    <div class="input-box">
                                        <label for="old-pass">Old-Password</label>
                                        <input type="password" placeholder="Old Password" required id="old-pass">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-box">
                                        <label for="login-pass">Password</label>
                                        <input type="password" placeholder="Enter your Password" required
                                               id="login-pass">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-box">
                                        <label for="re-enter-pass">Re-enter Password</label>
                                        <input type="password" placeholder="Re-enter your Password" required
                                               id="re-enter-pass">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn-color" type="submit" name="submit">Change Password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

@endsection
