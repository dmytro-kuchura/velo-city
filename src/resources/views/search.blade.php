@extends('layouts.main')

@section('content')
    @widget('breadcrumbs')

    <section class="ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-xl-100per">
                    <div class="shorting mb-30">
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="view">
                                    <div class="list-types grid active ">
                                        <a>
                                            <div class="grid-icon list-types-icon"></div>
                                        </a>
                                    </div>
                                    <div class="list-types list">
                                        <a>
                                            <div class="list-icon list-types-icon"></div>
                                        </a>
                                    </div>
                                </div>
                                <div class="short-by float-right-sm"><span>Сортировка :</span>
                                    <div class="select-item select-dropdown">
                                        <fieldset>
                                            <select name="speed" id="sort-price" class="option-drop">
                                                <option value="" selected="selected">Название (от А до Я)</option>
                                                <option value="">Название (от Я до А)</option>
                                                <option value="">Цена (низкая &gt; высокая)</option>
                                                <option value="">Цена (высокая &gt; низкая)</option>
                                                <option value="">Рейтинг (высокий)</option>
                                                <option value="">Рейтинг (низкий)</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="show-item float-left-sm">
                                    <span>Отображается :</span>
                                    <div class="select-item select-dropdown">
                                        <fieldset>
                                            <select name="speed" id="show-item" class="option-drop">
                                                <option value="" selected="selected">12</option>
                                                <option value="">24</option>
                                                <option value="">48</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                    <span>на страницу</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                                            <img
                                                                src="{{ $item->image ? $item->image : '/images/no-image.png' }}"
                                                                alt="{{ $item->name }}">
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
                                                                    <del class="price old-price">
                                                                        ₴ {{ $item->cost_old }}</del>
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

                            {!! $result->links('widgets.paginate') !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
