<?php

namespace App\Widgets;

use App\Repositories\ProductsRepository;
use Arrilot\Widgets\AbstractWidget;

class FeaturedProductsSlider extends AbstractWidget
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
     *
     * @param ProductsRepository $productsRepository
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function run(ProductsRepository $productsRepository)
    {
        $special = $productsRepository->getSpecial();
        $mostViewed = $productsRepository->getMostViewed();
        $latest = $productsRepository->getLatest();

        return view('widgets.featured-products-slider', [
            'special' => $special,
            'mostViewed' => $mostViewed,
            'latest' => $latest,
            'config' => $this->config,
        ]);
    }
}
