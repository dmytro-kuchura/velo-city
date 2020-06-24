<?php

namespace App\Widgets;

use Arrilot\Widgets\AbstractWidget;
use Illuminate\Support\Facades\Route;

class DashboardSidebar extends AbstractWidget
{
    /**
     * The configuration array.
     *
     * @var array
     */
    protected $config = [];

    /**
     * Treat this method as a controller action.
     * Return view() or other content to display.
     */
    public function run()
    {
        $route = Route::currentRouteName();

        $menu = '';

        switch ($route) {
            case 'dashboard.products.index':
            case 'dashboard.products.edit':
            case 'dashboard.products.create':
            case 'dashboard.brands.index':
            case 'dashboard.brands.create':
            case 'dashboard.categories.index':
            case 'dashboard.categories.create':
                $menu = 'products';
                break;
            case 'dashboard.orders.index':
            case 'dashboard.orders.edit':
            case 'dashboard.orders.create':
                $menu = 'orders';
                break;

            case 'dashboard.banners.index':
            case 'dashboard.banners.create':
                $menu = 'banners';
                break;
            case 'dashboard.news.index':
            case 'dashboard.news.edit':
            case 'dashboard.news.create':
                $menu = 'news';
                break;
        }

        return view('widgets.dashboard.sidebar', [
            'menu' => $menu,
            'config' => $this->config,
        ]);
    }
}
