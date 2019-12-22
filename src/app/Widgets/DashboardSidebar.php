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

        return view('widgets.dashboard.sidebar', [
            'route' => $route,
            'config' => $this->config,
        ]);
    }
}
