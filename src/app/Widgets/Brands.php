<?php

namespace App\Widgets;

use App\Repositories\BrandsRepository;
use Arrilot\Widgets\AbstractWidget;

class Brands extends AbstractWidget
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
    public function run(BrandsRepository $brandsRepository)
    {
        $brands = $brandsRepository->list();

        return view('widgets.brands', [
            'brands' => $brands,
            'config' => $this->config,
        ]);
    }
}
