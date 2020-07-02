@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="page-header">
                <div class="d-flex align-items-center">
                    <h2 class="page-header-title">Список новостей</h2>
                    <div>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ route('dashboard') }}"><i class="ti ti-home"></i></a>
                            </li>
                            <li class="breadcrumb-item active">Список новостей</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row flex-row">
            <news-list></news-list>
        </div>
    </div>
@endsection
