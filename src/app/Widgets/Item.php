<?php

namespace App\Widgets;

use App\Repositories\BannersRepository;
use Arrilot\Widgets\AbstractWidget;

class Item extends AbstractWidget
{
    /**
     * The configuration array.
     *
     * @var array
     */
    protected $config = [
        'item' => null
    ];

    /**
     * Treat this method as a controller action.
     * Return view() or other content to display.
     */
    public function run()
    {
        return view('widgets.item', [
            'config' => $this->config,
            'item' => $this->config['item'],
        ]);
    }
}
