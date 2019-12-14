<?php

namespace App\Widgets;

use App\Repositories\BannersRepository;
use Arrilot\Widgets\AbstractWidget;

class Banner extends AbstractWidget
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
    public function run(BannersRepository $bannersRepository)
    {
        $banners = $bannersRepository->list();

        return view('widgets.banner', [
            'banners' => $banners,
            'config' => $this->config,
        ]);
    }
}
