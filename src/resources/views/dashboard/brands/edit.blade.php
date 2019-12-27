@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="page-header">
                <div class="d-flex align-items-center">
                    <h2 class="page-header-title">Редактирование бренда</h2>
                    <div>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ route('dashboard') }}"><i class="ti ti-home"></i></a>
                            </li>
                            <li class="breadcrumb-item">
                                <a href="{{ route('dashboard.brands.index') }}">Бренды</a>
                            </li>
                            <li class="breadcrumb-item active">Редактирование бренда</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row flex-row">
            <div class="col-xl-12">
                <brand-edit></brand-edit>
            </div>
        </div>
    </div>
@endsection
