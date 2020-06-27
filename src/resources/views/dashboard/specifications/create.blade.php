@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="page-header">
                <div class="d-flex align-items-center">
                    <h2 class="page-header-title">Создание спецификации</h2>
                    <div>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ route('dashboard') }}"><i class="ti ti-home"></i></a>
                            </li>
                            <li class="breadcrumb-item">
                                <a href="{{ route('dashboard.specifications.index') }}">Спецификации</a>
                            </li>
                            <li class="breadcrumb-item active">Создание спецификации</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row flex-row">
            <div class="col-xl-12">
                <specifications-create></specifications-create>
            </div>
        </div>
    </div>
@endsection
