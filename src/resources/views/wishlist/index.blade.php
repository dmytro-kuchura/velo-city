@extends('layouts.main')

@section('title', $page->title ? $page->title : $page->name)
@section('description', $page->description ? $page->description : null)
@section('keywords', $page->keywords ? $page->keywords : null)

@section('content')
    @widget('breadcrumbs')
    <section class="ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12 ">
                    <div class="cart-item-table commun-table">
                        <div class="table-responsive">
                            <wishlist></wishlist>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mt-30">
                        <a href="{{ route('shop.index') }}" class="btn btn-color">
                            <span><i class="fa fa-angle-left"></i></span>Продолжить покупки
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
