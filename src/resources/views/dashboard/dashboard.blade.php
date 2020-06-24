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
            <div class="col-xl-12 col-md-6">
                <div class="widget widget-09 has-shadow">
                    <div class="widget-header d-flex align-items-center">
                        <h2>Заказы</h2>
                    </div>
                    <div class="widget-body">
                        <div class="row">
                            <div class="col-xl-10 col-12 no-padding">
                                <div>
                                    <canvas id="orders"></canvas>
                                </div>
                            </div>
                            <div class="col-xl-2 col-12 d-flex flex-column my-auto no-padding text-center">
                                <div class="some-stats mt-5">
                                    <div class="title">Завершенные заказы</div>
                                    <div class="number text-blue">856</div>
                                </div>
                                <div class="some-stats mt-3">
                                    <div class="title">Всего заказов</div>
                                    <div class="number text-blue">297</div>
                                </div>
                            </div>
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
