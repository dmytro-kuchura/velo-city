@extends('layouts.main')

@section('content')
    <div class="banner inner-banner1 ">
        <div class="container">
            <section class="banner-detail center-xs">
                <h1 class="banner-title">Checkout</h1>
                <div class="bread-crumb right-side float-none-xs">
                    <ul>
                        <li><a href="index.html">Home</a>/</li>
                        <li><a href="cart.html">Cart</a>/</li>
                        <li><span>Checkout</span></li>
                    </ul>
                </div>
            </section>
        </div>
    </div>

    <section class="checkout-section ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="checkout-step mb-40">
                        <ul>
                            <li class="active">
                                <a href="checkout.html">
                                    <div class="step">
                                        <div class="line"></div>
                                        <div class="circle">1</div>
                                    </div>
                                    <span>Оформление заказа</span>
                                </a>
                            </li>
                            <li>
                                <a href="order-overview.html">
                                    <div class="step">
                                        <div class="line"></div>
                                        <div class="circle">2</div>
                                    </div>
                                    <span>Завершение заказа</span>
                                </a>
                            </li>
                            <li>
                                <div class="step">
                                    <div class="line"></div>
                                </div>
                            </li>
                        </ul>
                        <hr>
                    </div>
                    <checkout></checkout>
                </div>
            </div>
        </div>
    </section>
@endsection
