<div class="default-sidebar">
    <nav class="side-navbar box-scroll sidebar-scroll">
        <ul class="list-unstyled">
            <li>
                <a href="#dropdown-products" aria-expanded="false" data-toggle="collapse"><i class="la la-columns"></i><span>Товары</span></a>
                <ul id="dropdown-products" class="collapse list-unstyled pt-0">
                    <li><a href="{{ route('dashboard.products.index') }}">Товары</a></li>
                    <li><a href="{{ route('dashboard.products.create') }}">Добавить товар</a></li>
                    <li><a href="db-modern.html">Категории</a></li>
                    <li><a href="db-social.html">Добавить категорию</a></li>
                    <li><a href="db-smarthome.html">Бренды</a></li>
                    <li><a href="db-all.html">Добавить бренд</a></li>
                </ul>
            </li>
            <li>
                <a href="#dropdown-banners" aria-expanded="{{ in_array($route, ['dashboard.banners.index', 'dashboard.banners.create']) ? 'true' : 'false' }}" data-toggle="collapse">
                    <i class="la la-puzzle-piece"></i>
                    <span>Баннеры</span>
                </a>
                <ul id="dropdown-banners" class="collapse list-unstyled {{ in_array($route, ['dashboard.banners.index', 'dashboard.banners.create']) ? 'show' : '' }} pt-0">
                    <li><a href="{{ route('dashboard.banners.index') }}">Баннеры</a></li>
                    <li><a href="{{ route('dashboard.banners.create') }}">Добавить баннер</a></li>
                </ul>
            </li>
            <li><a href="#dropdown-news" aria-expanded="false" data-toggle="collapse"><i class="la la-spinner"></i><span>Новости</span></a>
                <ul id="dropdown-news" class="collapse list-unstyled pt-0">
                    <li><a href="app-calendar.html">Список новостей</a></li>
                    <li><a href="app-chat.html">Добавить новость</a></li>
                </ul>
            </li>
        </ul>
        <span class="heading">Настройки</span>
        <ul class="list-unstyled">
            <li><a href="#dropdown-menu" aria-expanded="false" data-toggle="collapse"><i class="la la-share-alt"></i><span>Меню</span></a>
                <ul id="dropdown-menu" class="collapse list-unstyled pt-0">
                    <li><a href="components-buttons.html">Нижнее меню</a></li>
                    <li><a href="components-alerts.html">Верхенее меню</a></li>
                </ul>
            </li>
            <li><a href="#dropdown-settings" aria-expanded="false" data-toggle="collapse"><i class="la la-share-alt"></i><span>Настройки</span></a>
                <ul id="dropdown-settings" class="collapse list-unstyled pt-0">
                    <li><a href="components-buttons.html">Основные настройки</a></li>
                    <li><a href="components-alerts.html">Скрипты сайта</a></li>
                </ul>
            </li>
        </ul>
        <span class="heading">Статистика</span>
        <ul class="list-unstyled">
            <li><a href="#dropdown-pricing" aria-expanded="false" data-toggle="collapse"><i class="la la-usd"></i><span>Статистика товаров</span></a>
                <ul id="dropdown-pricing" class="collapse list-unstyled pt-0">
                    <li><a href="pages-404-01.html">Статистика покупок</a></li>
                    <li><a href="pages-404-02.html">Статистика просмотров</a></li>
                </ul>
            </li>
            <li><a href="#dropdown-error" aria-expanded="false" data-toggle="collapse"><i class="la la-exclamation-triangle"></i><span>Статистика посещений</span></a>
                <ul id="dropdown-error" class="collapse list-unstyled pt-0">
                    <li><a href="pages-404-01.html">Песещения сайта</a></li>
                    <li><a href="pages-404-02.html">Статистика переходов</a></li>
                </ul>
            </li>
        </ul>
    </nav>
</div>
