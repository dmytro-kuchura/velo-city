@extends('layouts.main')

@section('title', 'Главная страница')
@section('description', 'Велозапчасти и велоаксессуары с доставкой по Украине. Велозапчасти купить можно в нашем интернет магазине велозапчастей. Всего пару кликов и товар будет доставлен в срок!')
@section('keywords', 'велозапчасти, велоаксессуары, велозапчасти купить, магазин велозапчастей, велозапчасти интернет, велозапчасти интернет магазин')

@section('content')
    @widget('Slider')
    @widget('Categories')
    @widget('Products')
    @widget('Information')
@endsection