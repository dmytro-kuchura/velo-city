@extends('layouts.main')

@section('content')
    @widget('breadcrumbs')

    <section class="ptb-70">
        <div class="container">
            @if(count($result) > 0)
            <div class="row">
                @widget('filter')
                <div class="col-xl-10 col-lg-9 col-xl-80per">
                    <sortable></sortable>
                    <div class="product-listing grid-type">
                        <div class="inner-listing">
                            <div class="row">
                                @foreach($result as $item)
                                    <div class="col-xl-3 col-lg-4 col-md-4 col-6 item-width mb-30">
                                        <div class="product-item {{ $item->available === 1 ? '' : 'sold-out' }}">
                                            @if($item->sale)
                                                <div class="main-label sale-label"><span>Sale</span></div>
                                            @endif
                                            @if($item->new)
                                                <div class="main-label new-label"><span>New</span></div>
                                            @endif
                                            <div class="row">
                                                <div class="img-col col-12">
                                                    <div class="product-image">
                                                        <a href="{{ route('shop.item', ['alias' => $item->alias, 'id' => $item->id]) }}">
                                                            <img src="{{ $item->image ? $item->image : '/images/no-image.png' }}" alt="{{ $item->name }}">
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="detail-col col-12">
                                                    <div class="product-details">
                                                        <div class="product-item-details">
                                                            <div class="product-item-name">
                                                                <a href="{{ route('shop.item', ['alias' => $item->alias, 'id' => $item->id]) }}">
                                                                    {{ $item->name }}
                                                                </a>
                                                            </div>
{{--                                                            <div class="rating-summary-block">--}}
{{--                                                                <div class="rating-result" title="53%">--}}
{{--                                                                    <span style="width:53%"></span>--}}
{{--                                                                </div>--}}
{{--                                                            </div>--}}
                                                            <div class="price-box">
                                                                <span class="price">₴ {{ $item->cost }}</span>
                                                                @if($item->sale)
                                                                    <del class="price old-price">₴ {{ $item->cost_old }}</del>
                                                                @endif
                                                            </div>
                                                            <div class="product-des">
                                                                <p>{{ $item->getShortAttribute() }}</p>
                                                            </div>
                                                        </div>
                                                        <add-to-cart-and-wishlist :item="{{ $item->id }}"></add-to-cart-and-wishlist>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>

                            {!! $result->appends(request()->query())->links('widgets.paginate') !!}
                        </div>
                    </div>
                </div>
            </div>
            @else
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-xl-100per">
                        <div class="product-listing grid-type">
                            <div class="inner-listing">
                                <div class="row">
                                    @foreach($categories as $category)
                                        <div class="col-xl-3 col-lg-4 col-md-4 col-6 item-width mb-30">
                                            <div class="product-item">
                                                <div class="row">
                                                    <div class="img-col col-12">
                                                        <div class="product-image">
                                                            <a href="{{ route('shop.category', ['category' => $category->alias]) }}">
                                                                <img src="{{ $category->image ? $category->image : '/images/no-image.png' }}" alt="{{ $category->name }}">
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="detail-col col-12">
                                                        <div class="product-details">
                                                            <div class="product-item-details">
                                                                <div class="product-item-name">
                                                                    <a href="{{ route('shop.category', ['category' => $category->alias]) }}">
                                                                        {{ $category->name }}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endif
        </div>
    </section>
@endsection
