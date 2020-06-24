<header class="header">
    <nav class="navbar fixed-top">
        <div class="navbar-holder d-flex align-items-center align-middle justify-content-between">
            <div class="navbar-header">
                <a href="{{ route('dashboard') }}" class="navbar-brand">
                    <div class="brand-image brand-big">
                        <img src="/images/logo-new.png" alt="logo" class="logo-big">
                    </div>
                    <div class="brand-image brand-small">
                        <img src="/images/logo-new.png" alt="logo" class="logo-small">
                    </div>
                </a>
                <a id="toggle-btn" href="#" class="menu-btn active">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center pull-right">
                <li class="nav-item dropdown"><a id="notifications" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link"><i class="la la-bell animated infinite swing"></i><span class="badge-pulse"></span></a>
                    <ul aria-labelledby="notifications" class="dropdown-menu notification">
                        <li>
                            <div class="notifications-header">
                                <div class="title">Уведомления (4)</div>
                                <div class="notifications-overlay"></div>
                                <img src="/images/logo-new.png" alt="..." class="img-fluid">
                            </div>
                        </li>
                        <li>
                            <a href="#">
                                <div class="message-icon">
                                    <i class="la la-user"></i>
                                </div>
                                <div class="message-body">
                                    <div class="message-body-heading">
                                        New user registered
                                    </div>
                                    <span class="date">2 hours ago</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="message-icon">
                                    <i class="la la-calendar-check-o"></i>
                                </div>
                                <div class="message-body">
                                    <div class="message-body-heading">
                                        New event added
                                    </div>
                                    <span class="date">7 hours ago</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="message-icon">
                                    <i class="la la-history"></i>
                                </div>
                                <div class="message-body">
                                    <div class="message-body-heading">
                                        Server rebooted
                                    </div>
                                    <span class="date">7 hours ago</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="message-icon">
                                    <i class="la la-twitter"></i>
                                </div>
                                <div class="message-body">
                                    <div class="message-body-heading">
                                        You have 3 new followers
                                    </div>
                                    <span class="date">10 hours ago</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a rel="nofollow" href="#" class="dropdown-item all-notifications text-center">View All Notifications</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a id="user" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link">
                        <img src="/images/avatar.jpg" alt="..." class="avatar rounded-circle">
                    </a>
                    <ul aria-labelledby="user" class="user-size dropdown-menu">
                        <li class="welcome">
                            <img src="/images/avatar.jpg" class="rounded-circle">
                        </li>
                        <li>
                            <a href="app-mail.html" class="dropdown-item">

                            </a>
                        </li>
                        <li>
                            <a href="#" class="dropdown-item no-padding-bottom">
                                Настройки
                            </a>
                        </li>
                        <li class="separator"></li>
                        <li>
                            <a rel="nofollow" href="{{ route('logout') }}"
                               onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                               class="dropdown-item logout text-center">
                                <i class="ti-power-off"></i>
                            </a>
                        </li>

                    </ul>
                </li>
            </ul>
        </div>
    </nav>
    <form id="logout-form" action="{{ route('logout') }}"
          method="POST"
          style="display: none;">
        @csrf
    </form>
</header>
