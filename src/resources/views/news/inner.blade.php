@extends('layouts.main')

@section('title', $news->title ? $news->title : $news->name)
@section('description', $news->description ? $news->description : null)
@section('keywords', $news->keywords ? $news->keywords : null)

@section('content')
    @widget('breadcrumbs')
    <section class="ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-12 mb-60">
                            <div class="blog-media mb-20">
                                <img
                                    src="{{ $news->image ? $news->image : '/images/no-image.png' }}"
                                    alt="{{ $news->name }}">
                            </div>
                            <div class="blog-detail ">
                                <div class="post-info">
                                    <ul>
                                        <li>
                                            <span class="post-date">{{ $news->getRussianDate() }}</span>
                                        </li>
                                        <li><span>Автор</span>
                                            <a href="javascript:void(0)"> Администратор</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="blog-title">
                                    <a href="javascript:void(0)">{{ $news->name }}</a>
                                </div>
                                {!! $news->content !!}
                                <hr>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="comments-area-main">
                                @if(count($comments))
                                    <div class="comments-area">
                                        <h4>Комментарии<span>{{ $count_comments }}</span></h4>
                                        @foreach($comments[0] as $obj)
                                            <ul class="comment-list mt-20">
                                                <li>
                                                    <div class="comment-user">
                                                        <img src="/images/avatar-placeholder.svg"
                                                             alt="{{ $obj->name }}">
                                                    </div>
                                                    <div class="comment-detail">
                                                        <div class="user-name">{{ $obj->name }}</div>
                                                        <div class="post-info">
                                                            <ul>
                                                                <li>{{ date('F j, Y', strtotime($obj->created_at)) }}</li>
                                                            </ul>
                                                        </div>
                                                        <p>{{ $obj->message }}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        @endforeach
                                    </div>
                                @endif
                                <div class="main-form mt-30">
                                    <h4>Оставьте комментарий</h4>
                                    <comments :record="{{ $news->id }}"></comments>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="display: none;" itemprop="reviewRating" itemscope="" itemtype="http://schema.org/Rating" class="reviews-props">
            <div class="reviews-rating">
                Оценка: <span itemprop="ratingValue">4.3</span>
                <meta itemprop="worstRating" content="3">
                <meta itemprop="bestRating" content="5">
            </div>
        </div>

        <div style="display: none;" itemscope itemtype="http://schema.org/Article">
            <p itemprop="name">{{ $news->name }}</p>
            <meta itemprop="headline" content="{{ $news->name }}">
            <p itemprop="articleBody">{{ $news->content }}</p>">
            <meta itemprop="description" content="{{ $news->short }}"/>
            <p itemprop="genre">Техническая</p>
            <p itemprop="author">Velo-City</p>
            <p itemprop="datePublished">{{ substr(gmdate('r', strtotime($news->created_at)), 0, -5).'GMT' }}</p>
            <p itemprop="dateModified">{{ substr(gmdate('r', strtotime($news->created_at)), 0, -5).'GMT' }}</p>
            <p itemprop="mainEntityOfPage">1</p>

            <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
                <meta itemprop="name" content="Velo-City интернет-магазин">
                <meta itemprop="telephone" content="+380505701900">
                <meta itemprop="address" content="Херсон, Украина">
                <span itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
                    <img class="itemprops" itemprop="url image" width="250" height="250" src="/images/logo-new.png" alt="Velo-City интернет-магазин" />
                    <meta itemprop="width" content="250">
                    <meta itemprop="height" content="250">
                </span>
            </div>

            <p itemprop="image">{{ $news->image ? $news->image : '/images/no-image.png' }}</p>
        </div>
    </section>
@endsection
