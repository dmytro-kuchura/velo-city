<?php

namespace App\Widgets;

use App\Menu;
use Arrilot\Widgets\AbstractWidget;

class Header extends AbstractWidget
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
        $menu = [];

        $result = Menu::where('menu_id', 2)->orderBy('order', 'asc')->get();

        foreach ($result as $obj) {
            $menu[(int)$obj->parent_id][] = $obj;
        }

        dd($menu);

        return view('widgets.header', [
            'config' => $this->config,
            'menu' => $menu,
        ]);
    }
}
