<?php

namespace App\Widgets;

use App\Repositories\CatalogRepository;
use Arrilot\Widgets\AbstractWidget;

class Footer extends AbstractWidget
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
    public function run(CatalogRepository $catalogRepository)
    {
        $tree = $catalogRepository->getTree();

        return view('widgets.footer', [
            'tree' => $tree,
            'config' => $this->config,
        ]);
    }
}
