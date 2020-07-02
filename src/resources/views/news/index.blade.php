@extends('layouts.main')

@section('title', $page->title ? $page->title : $page->name)
@section('description', $page->description ? $page->description : null)
@section('keywords', $page->keywords ? $page->keywords : null)

@section('content')
    @widget('breadcrumbs')
    <section class="ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="blog-listing">
                        <div class="row">
                            @foreach($news as $obj)
                                <div class="col-xl-4 col-lg-6 col-12">
                                    <div class="blog-item">
                                        <div class="blog-media mb-20">
                                            <img src="{{ $obj->image ? $obj->image : '/images/no-image.png' }}" alt="{{ $obj->name }}">
                                            <div class="blog-effect"></div>
                                            <a href="{{ route('news.inner', ['alias' => $obj->alias]) }}" title="{{ $obj->name }}"
                                               class="read">&nbsp;</a>
                                        </div>
                                        <div class="blog-detail">
                                            <span class="post-date">{{ $obj->getRussianDate() }}</span>
                                            <div class="blog-title">
                                                <a href="{{ route('news.inner', ['alias' => $obj->alias]) }}">{{ $obj->name }}</a>
                                            </div>
                                            <p>
                                                {{ $obj->short }}
                                            </p>
                                            <hr>
                                            <div class="post-info">
                                                <ul>
                                                    <li><span>Автор:</span><a href="javascript:void(0)"> Администратор</a>
                                                    </li>
                                                    <li><a href="javascript:void(0)">({{ count($obj->comments) }}) комментариев</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>

                        {!! $news->appends(request()->query())->links('widgets.paginate') !!}
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
