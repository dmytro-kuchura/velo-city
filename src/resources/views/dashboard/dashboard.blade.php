@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="page-header">
                <div class="d-flex align-items-center">
                    <h2 class="page-header-title">Dashboard</h2>
                </div>
            </div>
        </div>
        <div class="row flex-row">
            <div class="col-xl-12 col-md-6">
                <!-- Begin Widget 09 -->
                <div class="widget widget-09 has-shadow">
                    <!-- Begin Widget Header -->
                    <div class="widget-header d-flex align-items-center">
                        <h2>Delivered Orders</h2>
                        <div class="widget-options">
                            <button type="button" class="btn btn-shadow">View all</button>
                        </div>
                    </div>
                    <!-- End Widget Header -->
                    <!-- Begin Widget Body -->
                    <div class="widget-body">
                        <div class="row">
                            <div class="col-xl-10 col-12 no-padding">
                                <div>
                                    <canvas id="orders"></canvas>
                                </div>
                            </div>
                            <div class="col-xl-2 col-12 d-flex flex-column my-auto no-padding text-center">
                                <div class="new-orders">
                                    <div class="title">New Orders</div>
                                    <div class="circle-orders">
                                        <div class="percent-orders"></div>
                                    </div>
                                </div>
                                <div class="some-stats mt-5">
                                    <div class="title">Total Delivered</div>
                                    <div class="number text-blue">856</div>
                                </div>
                                <div class="some-stats mt-3">
                                    <div class="title">Total Estimated</div>
                                    <div class="number text-blue">297</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Widget 09 -->
            </div>
        </div>
        <reviews></reviews>
        <orders-list></orders-list>
        <activity-log></activity-log>
    </div>
@endsection
