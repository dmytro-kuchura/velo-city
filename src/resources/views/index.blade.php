@extends('layouts.main')

@section('title', $page->title ? $page->title : $page->name)
@section('description', $page->description ? $page->description : null)
@section('keywords', $page->keywords ? $page->keywords : null)

@section('content')
    @widget('banner')

    {{--    @widget('subBanner')--}}
    @widget('featuredProducts')
    @widget('offerOfTheWeek')
    @widget('perellexBanner')
    @widget('featuredProductsSlider')
    @widget('blog')
    @widget('services')
    @widget('brands')
    @widget('newsLetter')
@endsection
