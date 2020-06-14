<?php

namespace App\Widgets;

use App\Repositories\BannersRepository;
use Arrilot\Widgets\AbstractWidget;

class Filter extends AbstractWidget
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

        return view('widgets.filter', [
            'config' => $this->config,
        ]);
    }
}
