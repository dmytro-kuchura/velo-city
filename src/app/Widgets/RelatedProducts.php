<?php

namespace App\Widgets;

use App\Repositories\ProductsRepository;
use Arrilot\Widgets\AbstractWidget;

class RelatedProducts extends AbstractWidget
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
    public function run(ProductsRepository $productsRepository)
    {
        $items = $productsRepository->getFeatured();

        return view('widgets.related-products', [
            'items' => $items,
            'config' => $this->config,
        ]);
    }
}
