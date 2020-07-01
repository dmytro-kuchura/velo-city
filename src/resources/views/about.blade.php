@extends('layouts.main')

@section('title', $page->title ? $page->title : $page->name)
@section('description', $page->description ? $page->description : null)
@section('keywords', $page->keywords ? $page->keywords : null)

@section('content')
    @widget('breadcrumbs')
    <section class="ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12">
                    <div class="about-detail">
                        <div class="row">
                            <div class="col-12">
                                <div class="heading-part align-center mb-30">
                                    <h2 class="main_title heading"><span>Интернет-магазин Velo-City</span></h2>
                                </div>
                            </div>
                            <div class="col-12 mb-30">
                                <div class="heading-part-desc align_left center-md">
                                    <h2 class="heading">
                                        Velo-City это интернет-магазин велосипедов, велотоваров, различных аксессуаров и
                                        велозапчастей но и так же спортивных товаров.
                                    </h2>
                                </div>
                                <p>
                                    В магазине представлены велосипеды высокого качества от мировых брендов: Ghost,
                                    Haibike, Winora но так же и многие другие велосипедные бренды.
                                    Так же в асортимент входят б/у велосипеды.
                                </p>
                            </div>
                            <div class="col-12">
                                <div class="image-part center-xs"><img alt="Roadie" src="images/about-sub.jpg"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mt-30">
                            <h3 class="heading-h3">Велосипед ?</h3>
                            <p>
                                Велосипед – это отличный способ проведения свободного времени на свежем воздухе
                                с пользой для здоровья и поддержания отличной формы,
                                экологически чистое и не требующее топлива транспортное средство,
                                которое поможет вам избежать городских пробок.
                            </p>

                            <p>
                                Если Вы хотите приобрести велосипед в интернет-магазине либо нашем физическом магазине,
                                всегда будем Вам рады!
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 pt-sm-60">
                    <div class="responsive-part">
                        <div class="row">
                            <div class="col-sm-12 partner-detail-main">
                                <div class="heading-part align-center mb-30">
                                    <h2 class="main_title heading"><span>Наши бренды</span></h2>
                                </div>
                                <p>
                                    Мы официальный дилер следующих брендов предоставленых в нашем магазине:
                                </p>
                            </div>
                            <div class="col-sm-12">
                                <div class="partner-block light-gray-bg">
                                    <ul>
                                        @foreach($brands as $brand)
                                            <li>
                                                <span>
                                                    <img src="{{ $brand->image }}" alt="{{ $brand->name }}"
                                                         style="max-width: 25%;">
                                                </span>
                                            </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
