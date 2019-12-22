@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="page-header">
                <div class="d-flex align-items-center">
                    <h2 class="page-header-title">Список баннеров</h2>
                </div>
            </div>
        </div>
        <div class="row flex-row">
            <banner-list></banner-list>
        </div>
    </div>
@endsection
