@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="page-header">
                <div class="d-flex align-items-center">
                    <h2 class="page-header-title">Панель администратора</h2>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="widget widget-09 has-shadow">
                    <div class="widget-header d-flex align-items-center">
                        <h2>Заказы</h2>
                    </div>
                    <div class="widget-body" style="max-height: 400px;">
                        <div class="row" style="max-height: 400px;">
                            <orders-chart></orders-chart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <reviews></reviews>
        <orders-widget-list></orders-widget-list>
        <activity-log></activity-log>
    </div>
@endsection
