@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid">
        <!-- Begin Page Header-->
        <div class="row">
            <div class="page-header">
                <div class="d-flex align-items-center">
                    <h2 class="page-header-title">Dashboard</h2>
                </div>
            </div>
        </div>
        <!-- End Page Header -->
        <!-- Begin Row -->
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
        <!-- End Row -->
        <!-- Begin Row -->
        <div class="row">
            <div class="col-md-12">
                <!-- Begin Widget 06 -->
                <div class="widget widget-06 has-shadow">
                    <!-- Begin Widget Header -->
                    <div class="widget-header bordered d-flex align-items-center">
                        <h2>Reviews</h2>
                        <div class="widget-options">
                            <div class="dropdown">
                                <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle">
                                    <i class="la la-ellipsis-h"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a href="#" class="dropdown-item">
                                        <i class="la la-edit"></i>Edit Widget
                                    </a>
                                    <a href="#" class="dropdown-item faq">
                                        <i class="la la-question-circle"></i>FAQ
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Widget Header -->
                    <!-- Begin Widget Body -->
                    <div class="widget-body p-0">
                        <div id="list-group" class="widget-scroll" style="max-height:490px;">
                            <ul class="reviews list-group w-100">
                                <!-- 01 -->
                                <li class="list-group-item">
                                    <div class="media">
                                        <div class="media-left align-self-start">
                                            <img src="assets/img/avatar/avatar-02.jpg" class="user-img rounded-circle" alt="...">
                                        </div>
                                        <div class="media-body align-self-center">
                                            <div class="username">
                                                <h4>Brandon Smith</h4>
                                            </div>
                                            <div class="msg">
                                                <div class="stars">
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star-half-empty"></i>
                                                </div>
                                                <p>
                                                    WoW! Amazing Work!
                                                </p>
                                            </div>
                                            <div class="meta">
                                                <span class="mr-3">30 minutes ago - 1 Reply</span>
                                                <a href="#">Reply</a>
                                            </div>
                                        </div>
                                        <div class="media-right pr-3 align-self-center">
                                            <div class="like text-center">
                                                <i class="ion-heart"></i>
                                                <span>12</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <!-- End 01 -->
                                <!-- 02 -->
                                <li class="list-group-item">
                                    <div class="media">
                                        <div class="media-left align-self-start">
                                            <img src="assets/img/avatar/avatar-05.jpg" class="user-img rounded-circle" alt="...">
                                        </div>
                                        <div class="media-body align-self-center">
                                            <div class="username">
                                                <h4>Megan Duncan</h4>
                                            </div>
                                            <div class="msg">
                                                <div class="stars">
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                </div>
                                                <p>
                                                    Very nice! Keep up the beautiful work.
                                                </p>
                                            </div>
                                            <div class="meta">
                                                <span class="mr-3">2 hours ago</span>
                                                <a href="#">Reply</a>
                                            </div>
                                        </div>
                                        <div class="media-right pr-3 align-self-center">
                                            <div class="like text-center">
                                                <i class="ion-heart"></i>
                                                <span>4</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <!-- End 02 -->
                                <!-- 03 -->
                                <li class="list-group-item">
                                    <div class="media">
                                        <div class="media-left align-self-start">
                                            <img src="assets/img/avatar/avatar-04.jpg" class="user-img rounded-circle" alt="...">
                                        </div>
                                        <div class="media-body align-self-center">
                                            <div class="username">
                                                <h4>Nathan Hunter</h4>
                                            </div>
                                            <div class="msg">
                                                <div class="stars">
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                </div>
                                                <p>
                                                    Nice work, good design!
                                                </p>
                                            </div>
                                            <div class="meta">
                                                <span class="mr-3">4 hours ago</span>
                                                <a href="#">Reply</a>
                                            </div>
                                        </div>
                                        <div class="media-right pr-3 align-self-center">
                                            <div class="like text-center">
                                                <i class="ion-heart"></i>
                                                <span>32</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <!-- End 03 -->
                                <!-- 04 -->
                                <li class="list-group-item">
                                    <div class="media">
                                        <div class="media-left align-self-start">
                                            <img src="assets/img/avatar/avatar-09.jpg" class="user-img rounded-circle" alt="...">
                                        </div>
                                        <div class="media-body align-self-center">
                                            <div class="username">
                                                <h4>Michael Bradley</h4>
                                            </div>
                                            <div class="msg">
                                                <div class="stars">
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star-half-empty"></i>
                                                </div>
                                                <p>
                                                    Very nice! Keep up the beautiful work.
                                                </p>
                                            </div>
                                            <div class="meta">
                                                <span class="mr-3">5 hours ago - 2 Reply</span>
                                                <a href="#">Reply</a>
                                            </div>
                                        </div>
                                        <div class="media-right pr-3 align-self-center">
                                            <div class="like text-center">
                                                <i class="ion-heart"></i>
                                                <span>2</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <!-- End 04 -->
                                <!-- 05 -->
                                <li class="list-group-item">
                                    <div class="media">
                                        <div class="media-left align-self-start">
                                            <img src="assets/img/avatar/avatar-03.jpg" class="user-img rounded-circle" alt="...">
                                        </div>
                                        <div class="media-body align-self-center">
                                            <div class="username">
                                                <h4>Louis Henry</h4>
                                            </div>
                                            <div class="msg">
                                                <div class="stars">
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star"></i>
                                                    <i class="la la-star-half-empty"></i>
                                                </div>
                                                <p>
                                                    I like the color combination!
                                                </p>
                                            </div>
                                            <div class="meta">
                                                <span class="mr-3">1 day ago</span>
                                                <a href="#">Reply</a>
                                            </div>
                                        </div>
                                        <div class="media-right pr-3 align-self-center">
                                            <div class="like text-center">
                                                <i class="ion-heart"></i>
                                                <span>9</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <!-- End 05 -->
                            </ul>
                        </div>
                        <!-- End List -->
                    </div>
                    <!-- End Widget Body -->
                </div>
                <!-- End Widget 06 -->
            </div>
        </div>
        <!-- End Row -->
        <div class="row flex-row">
            <div class="col-xl-12">
                <!-- Begin Widget 07 -->
                <div class="widget widget-07 has-shadow">
                    <!-- Begin Widget Header -->
                    <div class="widget-header bordered d-flex align-items-center">
                        <h2>Product Overview</h2>
                        <div class="widget-options">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-primary ripple">Week</button>
                                <button type="button" class="btn btn-primary ripple">Month</button>
                            </div>
                        </div>
                    </div>
                    <!-- End Widget Header -->
                    <!-- Begin Widget Body -->
                    <div class="widget-body">
                        <div class="table-responsive table-scroll padding-right-10" style="max-height:520px;">
                            <table class="table table-hover mb-0">
                                <thead>
                                <tr>
                                    <th>
                                        <div class="styled-checkbox mt-2">
                                            <input type="checkbox" name="check-all" id="check-all">
                                            <label for="check-all"></label>
                                        </div>
                                    </th>
                                    <th>Order ID</th>
                                    <th>Customer Name</th>
                                    <th>Country</th>
                                    <th>Ship Date</th>
                                    <th><span style="width:100px;">Status</span></th>
                                    <th>Order Total</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td style="width:5%;">
                                        <div class="styled-checkbox mt-2">
                                            <input type="checkbox" name="cb1" id="cb1">
                                            <label for="cb1"></label>
                                        </div>
                                    </td>
                                    <td><span class="text-primary">054-01-FR</span></td>
                                    <td>Lori Baker</td>
                                    <td>US</td>
                                    <td>10/21/2017</td>
                                    <td><span style="width:100px;"><span class="badge-text badge-text-small info">Paid</span></span></td>
                                    <td>$139.45</td>
                                    <td class="td-actions">
                                        <a href="#"><i class="la la-edit edit"></i></a>
                                        <a href="#"><i class="la la-close delete"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:5%;">
                                        <div class="styled-checkbox mt-2">
                                            <input type="checkbox" name="cb2" id="cb2">
                                            <label for="cb2"></label>
                                        </div>
                                    </td>
                                    <td><span class="text-primary">021-12-US</span></td>
                                    <td>Lawrence Crawford</td>
                                    <td>FR</td>
                                    <td>10/21/2017</td>
                                    <td><span style="width:100px;"><span class="badge-text badge-text-small info">Paid</span></span></td>
                                    <td>$189.00</td>
                                    <td class="td-actions">
                                        <a href="#"><i class="la la-edit edit"></i></a>
                                        <a href="#"><i class="la la-close delete"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:5%;">
                                        <div class="styled-checkbox mt-2">
                                            <input type="checkbox" name="cb3" id="cb3">
                                            <label for="cb3"></label>
                                        </div>
                                    </td>
                                    <td><span class="text-primary">189-01-RU</span></td>
                                    <td>Samuel Walker</td>
                                    <td>AU</td>
                                    <td>08/21/2017</td>
                                    <td><span style="width:100px;"><span class="badge-text badge-text-small danger">Failed</span></span></td>
                                    <td>$107.55</td>
                                    <td class="td-actions">
                                        <a href="#"><i class="la la-edit edit"></i></a>
                                        <a href="#"><i class="la la-close delete"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:5%;">
                                        <div class="styled-checkbox mt-2">
                                            <input type="checkbox" name="cb4" id="cb4">
                                            <label for="cb4"></label>
                                        </div>
                                    </td>
                                    <td><span class="text-primary">092-06-FR</span></td>
                                    <td>Angela Walters</td>
                                    <td>US</td>
                                    <td>08/21/2017</td>
                                    <td><span style="width:100px;"><span class="badge-text badge-text-small success">Delivered</span></span></td>
                                    <td>$129.85</td>
                                    <td class="td-actions">
                                        <a href="#"><i class="la la-edit edit"></i></a>
                                        <a href="#"><i class="la la-close delete"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:5%;">
                                        <div class="styled-checkbox mt-2">
                                            <input type="checkbox" name="cb5" id="cb5">
                                            <label for="cb5"></label>
                                        </div>
                                    </td>
                                    <td><span class="text-primary">021-09-US</span></td>
                                    <td>Ryan Hanson</td>
                                    <td>ES</td>
                                    <td>07/21/2017</td>
                                    <td><span style="width:100px;"><span class="badge-text badge-text-small info">Paid</span></span></td>
                                    <td>$199.95</td>
                                    <td class="td-actions">
                                        <a href="#"><i class="la la-edit edit"></i></a>
                                        <a href="#"><i class="la la-close delete"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:5%;">
                                        <div class="styled-checkbox mt-2">
                                            <input type="checkbox" name="cb6" id="cb6">
                                            <label for="cb6"></label>
                                        </div>
                                    </td>
                                    <td><span class="text-primary">054-01-FR</span></td>
                                    <td>Evelyn Black</td>
                                    <td>FR</td>
                                    <td>10/21/2017</td>
                                    <td><span style="width:100px;"><span class="badge-text badge-text-small info">Paid</span></span></td>
                                    <td>$139.45</td>
                                    <td class="td-actions">
                                        <a href="#"><i class="la la-edit edit"></i></a>
                                        <a href="#"><i class="la la-close delete"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:5%;">
                                        <div class="styled-checkbox mt-2">
                                            <input type="checkbox" name="cb7" id="cb7">
                                            <label for="cb7"></label>
                                        </div>
                                    </td>
                                    <td><span class="text-primary">021-12-US</span></td>
                                    <td>James Morris</td>
                                    <td>EN</td>
                                    <td>10/21/2017</td>
                                    <td><span style="width:100px;"><span class="badge-text badge-text-small info">Paid</span></span></td>
                                    <td>$189.00</td>
                                    <td class="td-actions">
                                        <a href="#"><i class="la la-edit edit"></i></a>
                                        <a href="#"><i class="la la-close delete"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:5%;">
                                        <div class="styled-checkbox mt-2">
                                            <input type="checkbox" name="cb8" id="cb8">
                                            <label for="cb8"></label>
                                        </div>
                                    </td>
                                    <td><span class="text-primary">189-01-RU</span></td>
                                    <td>Valentin H.</td>
                                    <td>AU</td>
                                    <td>08/21/2017</td>
                                    <td><span style="width:100px;"><span class="badge-text badge-text-small danger">Failed</span></span></td>
                                    <td>$107.55</td>
                                    <td class="td-actions">
                                        <a href="#"><i class="la la-edit edit"></i></a>
                                        <a href="#"><i class="la la-close delete"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:5%;">
                                        <div class="styled-checkbox mt-2">
                                            <input type="checkbox" name="cb9" id="cb9">
                                            <label for="cb9"></label>
                                        </div>
                                    </td>
                                    <td><span class="text-primary">092-06-FR</span></td>
                                    <td>Beverly Matthews</td>
                                    <td>RU</td>
                                    <td>08/21/2017</td>
                                    <td><span style="width:100px;"><span class="badge-text badge-text-small info">Paid</span></span></td>
                                    <td>$129.85</td>
                                    <td class="td-actions">
                                        <a href="#"><i class="la la-edit edit"></i></a>
                                        <a href="#"><i class="la la-close delete"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:5%;">
                                        <div class="styled-checkbox mt-2">
                                            <input type="checkbox" name="cb10" id="cb10">
                                            <label for="cb10"></label>
                                        </div>
                                    </td>
                                    <td><span class="text-primary">021-09-US</span></td>
                                    <td>Jeffrey Arnold</td>
                                    <td>US</td>
                                    <td>07/21/2017</td>
                                    <td><span style="width:100px;"><span class="badge-text badge-text-small info">Paid</span></span></td>
                                    <td>$199.95</td>
                                    <td class="td-actions">
                                        <a href="#"><i class="la la-edit edit"></i></a>
                                        <a href="#"><i class="la la-close delete"></i></a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- End Widget Body -->
                    <!-- Begin Widget Footer -->
                    <div class="widget-footer d-flex align-items-center">
                        <div class="mr-auto p-2">
                            <span class="display-items">Showing 1-30 / 150 Results</span>
                        </div>
                        <div class="p-2">
                            <nav aria-label="...">
                                <ul class="pagination justify-content-end">
                                    <li class="page-item disabled">
                                        <span class="page-link"><i class="ion-chevron-left"></i></span>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item active">
                                        <span class="page-link">2<span class="sr-only">(current)</span></span>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item">
                                        <a class="page-link" href="#"><i class="ion-chevron-right"></i></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <!-- End Widget Footer -->
                </div>
                <!-- End Widget 07 -->
            </div>
        </div>
        <!-- End Row -->

        <div class="row flex-row">
        <div class="col-xl-12">
            <!-- Begin Widget 11 -->
            <div class="widget widget-11 has-shadow">
                <!-- Begin Widget Header -->
                <div class="widget-header bordered d-flex align-items-center">
                    <h2>Activity Log</h2>
                    <div class="widget-options">
                        <div class="dropdown">
                            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle">
                                <i class="la la-ellipsis-h"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a href="#" class="dropdown-item">
                                    <i class="la la-history"></i>History
                                </a>
                                <a href="#" class="dropdown-item">
                                    <i class="la la-bell-slash"></i>Disable Alerts
                                </a>
                                <a href="#" class="dropdown-item">
                                    <i class="la la-edit"></i>Edit Widget
                                </a>
                                <a href="#" class="dropdown-item faq">
                                    <i class="la la-question-circle"></i>FAQ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Widget Header -->
                <!-- Begin Widget Body -->
                <div class="widget-body p-0 widget-scroll" style="max-height:450px;">
                    <!-- Begin 01 -->
                    <div class="timeline violet">
                        <div class="timeline-content d-flex align-items-center">
                            <div class="user-image">
                                <img class="rounded-circle" src="assets/img/avatar/avatar-06.jpg" alt="...">
                            </div>
                            <div class="d-flex flex-column mr-auto">
                                <div class="title">
                                    <span class="username">Beverly Oliver</span>
                                    Send you a friend request
                                </div>
                                <div class="time">4 min ago</div>
                            </div>
                        </div>
                    </div>
                    <!-- End 01 -->
                    <!-- Begin 02 -->
                    <div class="timeline red">
                        <div class="timeline-content d-flex align-items-center">
                            <div class="timeline-icon">
                                <i class="la la-spinner"></i>
                            </div>
                            <div class="d-flex flex-column mr-auto">
                                <div class="title">
                                    Server rebooted
                                </div>
                                <div class="time">10 min ago</div>
                            </div>
                        </div>
                    </div>
                    <!-- End 02 -->
                    <!-- Begin 03 -->
                    <div class="timeline violet">
                        <div class="timeline-content d-flex align-items-center">
                            <div class="user-image">
                                <img class="rounded-circle" src="assets/img/avatar/avatar-05.jpg" alt="...">
                            </div>
                            <div class="d-flex flex-column mr-auto">
                                <div class="title">
                                    <span class="username">Megan Duncan</span>
                                    Followed 4 people
                                    <div class="users-like">
                                        <a href="profile.html">
                                            <img src="assets/img/avatar/avatar-01.jpg" class="img-fluid rounded-circle" alt="...">
                                        </a>
                                        <a href="profile.html">
                                            <img src="assets/img/avatar/avatar-02.jpg" class="img-fluid rounded-circle" alt="...">
                                        </a>
                                        <a href="profile.html">
                                            <img src="assets/img/avatar/avatar-07.jpg" class="img-fluid rounded-circle" alt="...">
                                        </a>
                                        <a href="profile.html">
                                            <img src="assets/img/avatar/avatar-09.jpg" class="img-fluid rounded-circle" alt="...">
                                        </a>
                                    </div>
                                </div>
                                <div class="time">12 min ago</div>
                            </div>
                        </div>
                    </div>
                    <!-- End 03 -->
                    <!-- Begin 04 -->
                    <div class="timeline blue">
                        <div class="timeline-content d-flex align-items-center">
                            <div class="timeline-icon">
                                <i class="la la-heart-o"></i>
                            </div>
                            <div class="d-flex flex-column mr-auto">
                                <div class="title">
                                    <span class="username">Brandon Smith</span>
                                    Liked <span class="font-weight-bold"><a href="#">Elisyam Admin Template</a></span>
                                </div>
                                <div class="time">30 min ago</div>
                            </div>
                        </div>
                    </div>
                    <!-- End 04 -->
                    <!-- Begin 05 -->
                    <div class="timeline violet">
                        <div class="timeline-content d-flex align-items-center">
                            <div class="timeline-icon">
                                <i class="la la-twitter"></i>
                            </div>
                            <div class="d-flex flex-column mr-auto">
                                <div class="title">
                                    + 3 new followers
                                    <div class="users-like">
                                        <a href="profile.html">
                                            <img src="assets/img/avatar/avatar-09.jpg" class="img-fluid rounded-circle" alt="...">
                                        </a>
                                        <a href="profile.html">
                                            <img src="assets/img/avatar/avatar-06.jpg" class="img-fluid rounded-circle" alt="...">
                                        </a>
                                        <a href="profile.html">
                                            <img src="assets/img/avatar/avatar-03.jpg" class="img-fluid rounded-circle" alt="...">
                                        </a>
                                    </div>
                                </div>
                                <div class="time">34 min ago</div>
                            </div>
                        </div>
                    </div>
                    <!-- End 05 -->
                    <!-- Begin 06 -->
                    <div class="timeline violet">
                        <div class="timeline-content d-flex align-items-center">
                            <div class="user-image">
                                <img class="rounded-circle" src="assets/img/avatar/avatar-04.jpg" alt="...">
                            </div>
                            <div class="d-flex flex-column mr-auto">
                                <div class="title">
                                    <span class="username">Nathan Hunter</span>
                                    Invited you in a group
                                </div>
                                <div class="time">42 min ago</div>
                            </div>
                        </div>
                    </div>
                    <!-- End 06 -->
                    <!-- Begin 06 -->
                    <div class="timeline violet">
                        <div class="timeline-content d-flex align-items-center">
                            <div class="user-image">
                                <img class="rounded-circle" src="assets/img/avatar/avatar-03.jpg" alt="...">
                            </div>
                            <div class="d-flex flex-column mr-auto">
                                <div class="title">
                                    <span class="username">Louis Henry</span>
                                    Is now following you
                                </div>
                                <div class="time">50 min ago</div>
                            </div>
                        </div>
                    </div>
                    <!-- End 06 -->
                    <!-- Begin 07 -->
                    <div class="timeline blue">
                        <div class="timeline-content d-flex align-items-center">
                            <div class="timeline-icon">
                                <i class="la la-image"></i>
                            </div>
                            <div class="d-flex flex-column mr-auto">
                                <div class="title">
                                    <span class="username">Brandon Smith</span>
                                    Uploaded <span class="font-weight-bold"><a href="#">8 photos</a></span>
                                </div>
                                <div class="time">1 hour ago</div>
                            </div>
                        </div>
                    </div>
                    <!-- End 07 -->
                </div>
                <!-- End Widget Body -->
            </div>
            <!-- End Widget 11 -->
        </div>
    </div>
    </div>
@endsection
