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
        <div class="row flex-row">
            <div class="col-xl-6">
                <div class="widget has-shadow">
                    <div class="widget-header bordered no-actions d-flex align-items-center">
                        <h4>Заказы</h4>
                    </div>
                    <div class="widget-body">
                        <orders-chart></orders-chart>
                    </div>
                </div>
            </div>
            <div class="col-xl-6">
                <div class="widget has-shadow">
                    <div class="widget-header bordered no-actions d-flex align-items-center">
                        <h4>Просмотры и посещения</h4>
                    </div>
                    <div class="widget-body">
                        <orders-chart></orders-chart>
                    </div>
                </div>
            </div>
        </div>
        <reviews></reviews>
        <orders-widget-list></orders-widget-list>
        <activity-log></activity-log>
    </div>
@endsection
