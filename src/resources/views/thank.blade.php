@extends('layouts.main')

@section('content')
    @widget('breadcrumbs')

    <section class="checkout-section ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="checkout-step mb-40">
                        <ul>
                            <li>
                                <a href="javascript:void(0)">
                                    <div class="step">
                                        <div class="line"></div>
                                        <div class="circle">1</div>
                                    </div>
                                    <span>Оформление заказа</span>
                                </a>
                            </li>
                            <li class="active-checkout-step">
                                <a href="javascript:void(0)">
                                    <div class="step">
                                        <div class="line"></div>
                                        <div class="circle">2</div>
                                    </div>
                                    <span>Завершение заказа</span>
                                </a>
                            </li>
                            <li class="active-checkout-step">
                                <div class="step">
                                    <div class="line"></div>
                                </div>
                            </li>
                        </ul>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
