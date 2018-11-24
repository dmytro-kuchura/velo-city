<?php

namespace App\Widgets;

use App\Posts;
use Arrilot\Widgets\AbstractWidget;

class News extends AbstractWidget
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
        $result = Posts::where('status', 'PUBLISHED')->take(4)->inRandomOrder()->get();

        return view('widgets.news', [
            'config' => $this->config,
            'result' => $result,
        ]);
    }
}
