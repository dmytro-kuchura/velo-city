@extends('layouts.main')

@section('content')
    <div class="banner inner-banner1 ">
        <div class="container">
            <section class="banner-detail center-xs">
                <h1 class="banner-title">Shopping Cart</h1>
                <div class="bread-crumb right-side float-none-xs">
                    <ul>
                        <li><a href="index.html">Home</a>/</li>
                        <li><span>Shopping Cart</span></li>
                    </ul>
                </div>
            </section>
        </div>
    </div>

    <section class="ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="cart-item-table commun-table">
                        <div class="table-responsive">
                            <cart-list></cart-list>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-30">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="mt-30 mt-xs-15">
                            <a href="shop-3col-sidebar.html" class="btn btn-color">
                                <span><i class="fa fa-angle-left"></i></span>
                                Continue Shopping
                            </a>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mt-30 mt-xs-15 right-side xs-float-none">
                            <a href="checkout.html" class="btn btn-color">Proceed to checkout
                                <span><i class="fa fa-angle-right"></i></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="mtb-30">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="cart-total-table commun-table">
                            <div class="table-responsive">
                                <cart-total></cart-total>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
