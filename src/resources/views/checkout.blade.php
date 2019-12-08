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
                                    <span>Shipping</span>
                                </a>
                            </li>
                            <li>
                                <a href="order-overview.html">
                                    <div class="step">
                                        <div class="line"></div>
                                        <div class="circle">2</div>
                                    </div>
                                    <span>Order Overview</span>
                                </a>
                            </li>
                            <li>
                                <a href="payment.html">
                                    <div class="step">
                                        <div class="line"></div>
                                        <div class="circle">3</div>
                                    </div>
                                    <span>Payment</span>
                                </a>
                            </li>
                            <li>
                                <a href="order-complete.html">
                                    <div class="step">
                                        <div class="line"></div>
                                        <div class="circle">4</div>
                                    </div>
                                    <span>Order Complete</span>
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
                    <div class="checkout-content">
                        <div class="row">
                            <div class="col-12">
                                <div class="heading-part align-center">
                                    <h2 class="heading">Please fill up your Shipping details</h2>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-xl-6 col-lg-8 col-md-8">
                                <form action="order-overview.html" class="main-form full">
                                    <div class="row mb-20">
                                        <div class="col-12 mb-20">
                                            <div class="heading-part">
                                                <h3 class="sub-heading">Оформление заказа</h3>
                                            </div>
                                            <hr>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-box">
                                                <input type="text" required placeholder="Full Name">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-box">
                                                <input type="email" required placeholder="Email Address">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-box">
                                                <input type="text" required placeholder="Contact Number">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 mb-20">
                                            <div class="heading-part">
                                                <h3 class="sub-heading">Доставка</h3>
                                            </div>
                                            <hr>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-box">
                                                <fieldset>
                                                    <select name="billingcountryId" class="option-drop"
                                                            id="billingcountryid">
                                                        <option selected="" value="">Вариант доставки</option>
                                                        <option value="AX">Самовывоз</option>
                                                        <option value="AX">Новой Почтой</option>
                                                        <option value="AF">Курьером (Новой Почтой)</option>
                                                        <option value="AF">Justin</option>
                                                    </select>
                                                </fieldset>
                                                <span>Please include landmark (e.g : Opposite Bank) as the carrier service may find it easier to locate your address.</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-box select-dropdown">
                                                <fieldset>
                                                    <select name="billingcountryId" class="option-drop"
                                                            id="billingcountryid">
                                                        <option selected="" value="">Выберите область</option>
                                                        <option value="AX">Aland Islands</option>
                                                        <option value="AF">Afghanistan</option>
                                                    </select>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-box select-dropdown">
                                                <fieldset>
                                                    <select name="billingstateId" class="option-drop"
                                                            id="billingstateid">
                                                        <option value="">Выберите город</option>
                                                        <option value="AP">Andhra Pradesh</option>
                                                        <option value="AR">Arunachal Pradesh</option>
                                                    </select>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mt-20 mt-xs-15">
                                            <a href="order-overview.html" class="btn btn-color right-side">Next</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
