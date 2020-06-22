@extends('layouts.main')

@section('content')
    @widget('breadcrumbs')

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
                            <a href="{{ route('shop.index') }}" class="btn btn-color">
                                <span><i class="fa fa-angle-left"></i></span>
                                Продолжить покупки
                            </a>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mt-30 mt-xs-15 right-side xs-float-none">
                            <a href="{{ route('checkout') }}" class="btn btn-color">
                                Оформить заказ
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
