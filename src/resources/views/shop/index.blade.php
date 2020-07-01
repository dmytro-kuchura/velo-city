@extends('layouts.main')

@section('title', $page->title ? $page->title : $page->name)
@section('description', $page->description ? $page->description : null)
@section('keywords', $page->keywords ? $page->keywords : null)

@section('content')
    @widget('breadcrumbs')

    <section class="ptb-70">
        <div class="container">
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
                                                            <img
                                                                src="{{ $category->image ? $category->image : '/images/no-image.png' }}"
                                                                alt="{{ $category->name }}">
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
        </div>
    </section>
@endsection
