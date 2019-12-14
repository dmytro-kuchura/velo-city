@extends('layouts.main')

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
