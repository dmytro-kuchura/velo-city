<?php

namespace App\Widgets;

use App\Repositories\NewsRepository;
use Arrilot\Widgets\AbstractWidget;

class Blog extends AbstractWidget
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
    public function run(NewsRepository $newsRepository)
    {
        $news = $newsRepository->recent(6);

        return view('widgets.blog', [
            'news' => $news,
            'config' => $this->config,
        ]);
    }
}
