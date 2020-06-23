@extends('layouts.main')

@section('content')
    @widget('breadcrumbs')

    <section class="checkout-section ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="checkout-step mb-40">
                        <ul>
                            <li class="active-checkout-step">
                                <a href="{{ route('checkout') }}">
                                    <div class="step">
                                        <div class="line"></div>
                                        <div class="circle">1</div>
                                    </div>
                                    <span>Оформление заказа</span>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
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
                    <checkout :user="{{ $user }}"></checkout>
                </div>
            </div>
        </div>
    </section>
@endsection
