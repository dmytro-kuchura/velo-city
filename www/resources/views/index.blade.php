@extends('layouts.main')

{{--@if (session('status'))--}}
{{--    <div class="alert alert-success" role="alert">--}}
{{--        {{ session('status') }}--}}
{{--    </div>--}}
{{--@endif--}}


@section('content')
    <!--  Featured Products Block Start  -->
    {{ Widget::run('FeaturedProducts') }}
    <!--  Featured Products Block Start  -->

    <!-- Perellex Banner Start -->
    {{ Widget::run('PerellexBanner') }}
    <!-- PerellexBanner End -->

    <!-- Our Products Block Start -->
    {{ Widget::run('OurProducts') }}
    <!-- Our Products Block End -->

    <!-- News Block Start -->
    {{ Widget::run('News') }}
    <!-- News Block End -->

    <!--  Services Block Start  -->
    {{ Widget::run('Services') }}
    <!--  Services Block End  -->

    <!-- Brands block Start  -->
    {{ Widget::run('Brands') }}
    <!-- Brands block End  -->
@endsection
