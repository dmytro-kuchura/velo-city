@extends('layouts.main')

@section('title', $result->title ? $result->title : $result->name)
@section('description', $result->description ? $result->description : null)
@section('keywords', $result->keywords ? $result->keywords : null)

@section('content')
    @widget('breadcrumbs')

    <section class="pt-70">
        <div class="container">
            <div class="row">
                <div class="col-xl-9 col-12">
                    <div class="row">
                        <div class="col-lg-5 col-md-5 mb-xs-30">

                            <div class="fotorama" data-nav="thumbs" data-allowfullscreen="native">
                                @if(count($result->images) > 0)
                                    @foreach($result->images as $image)
                                        <a href="#">
                                            <img src="{{ $image->link }}" alt="{{ $result->name }}">
                                        </a>
                                    @endforeach
                                @else
                                    <a href="#">
                                        <img src="{{ $result->image }}" alt="{{ $result->name }}">
                                    </a>
                                @endif
                            </div>

                        </div>
                        <div class="col-lg-7 col-md-7">
                            <div class="row">
                                <div class="col-12">
                                    <div class="product-detail-main">
                                        <div class="product-item-details">
                                            <h1 class="product-item-name">{{ $result->name }}</h1>

                                            <div class="price-box">
                                                <span class="price">₴ {{ $result->cost }}</span>
                                                @if($result->sale)
                                                    <del class="price old-price">₴ {{ $result->cost_old }}</del>
                                                @endif
                                            </div>
                                            <div class="product-info-stock-sku">
                                                <div>
                                                    <label>Наличие: </label>
                                                    @if($result->available === 1)
                                                        <span class="info-deta">В наличии</span>
                                                    @else
                                                        <span class="info-deta">Отсутсвует</span>
                                                    @endif
                                                </div>
                                                <div>
                                                    <label>Акртикул: </label>
                                                    <span class="info-deta">{{ $result->artikul }}</span>
                                                </div>
                                            </div>
                                            <ul class="product-list">
                                                <li><i class="fa fa-check"></i> Официальная гарантия от производителя</li>
                                                <li><i class="fa fa-check"></i> Рассрочка 0% без переплат</li>
                                                <li><i class="fa fa-check"></i> Доставка по всей Украине</li>
                                            </ul>
                                            <hr class="mb-20">
                                            <add-to-cart :item="{{ $result->id }}"></add-to-cart>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 d-none d-xl-block">
                    <div class="sub-banner-block align-center">
                        <img src="/images/pro-banner.jpg" alt="Roadie">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="ptb-70">
        <div class="container">
            <div class="product-detail-tab">
                <div class="row">
                    <div class="col-lg-12">
                        <div id="tabs">
                            <ul class="nav nav-tabs">
                                <li><a class="tab-Description selected" title="Description">Описание</a></li>
                                <li><a class="tab-Product-Tags" title="Product-Tags">Характеристики</a></li>
                                {{--<li><a class="tab-Reviews" title="Reviews">Отзывы</a></li>--}}
                            </ul>
                        </div>
                        <div id="items">
                            <div class="tab_content">
                                <ul>
                                    <li>
                                        <div class="items-Description selected">
                                            <div class="Description">{!! $result->information !!}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="items-Product-Tags">
                                            <p>{!! $result->specification !!}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="items-Reviews">
                                            <div class="comments-area">
                                                <h4>Comments<span>(2)</span></h4>
                                                <ul class="comment-list mt-30">
                                                    <li>
                                                        <div class="comment-user"><img src="/images/comment-user3.jpg"
                                                                                       alt="Roadie"></div>
                                                        <div class="comment-detail">
                                                            <div class="user-name">Kennedy Doe</div>
                                                            <div class="post-info">
                                                                <ul>
                                                                    <li>Fab 11, 2016</li>
                                                                    <li><a href="#"><i class="fa fa-reply"></i>Reply</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <p>Consectetur adipiscing elit integer sit amet augue
                                                                laoreet maximus nuncac.</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="main-form mt-30">
                                                <h4>Оставьте комменатрий</h4>
                                                <form>
                                                    <div class="row mt-30">
                                                        <div class="col-md-4 mb-30">
                                                            <input type="text" placeholder="Name" required>
                                                        </div>
                                                        <div class="col-md-4 mb-30">
                                                            <input type="email" placeholder="Email" required>
                                                        </div>
                                                        <div class="col-md-4 mb-30">
                                                            <input type="text" placeholder="Website" required>
                                                        </div>
                                                        <div class="col-12 mb-30">
                                                            <textarea cols="30" rows="3" placeholder="Message"
                                                                      required></textarea>
                                                        </div>
                                                        <div class="col-12">
                                                            <button class="btn btn-color" name="submit" type="submit">
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    @widget('relatedProducts')
@endsection
