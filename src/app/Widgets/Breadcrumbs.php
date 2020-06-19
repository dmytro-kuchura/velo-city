<?php

namespace App\Widgets;

use App\Repositories\CatalogRepository;
use App\Repositories\ProductsRepository;
use Arrilot\Widgets\AbstractWidget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class Breadcrumbs extends AbstractWidget
{
    /**
     * The configuration array.
     *
     * @var array
     */
    protected $config = [];

    public function run(
        ProductsRepository $productsRepository,
        CatalogRepository $catalogRepository,
        Request $request
    )
    {
        $uri = Route::currentRouteName();
        $alias = $request->route('alias') ?? $request->route('alias');

        switch ($uri) {
            case 'shop.category':
                $categories = $catalogRepository->getTreeForBreadcrumbs(Route::current()->parameter('category'));

                $breadcrumbs = [
                    [
                        'label' => __('breadcrumbs.index.title'),
                        'link' => route('home'),
                    ],
                ];

                $categories = array_reverse($categories);
                $length = count($categories) - 1;

                foreach ($categories as $key => $category) {
                    if ($length !== $key) {
                        $breadcrumbs[] = [
                            'label' => $category->name,
                            'link' => route('shop.category', ['category' => $category->alias])
                        ];
                    } else {
                        $breadcrumbs[] = [
                            'label' => $category->name,
                        ];
                    }
                }

                $page = $category->title ? $category->title : $category->name;
                break;
            case 'shop.item':
                $item = $productsRepository->find(Route::current()->parameter('id'));
                $category = $catalogRepository->findById($item->category_id);
                $categories = $catalogRepository->getTreeForBreadcrumbs($category->alias);

                $breadcrumbs = [
                    [
                        'label' => __('breadcrumbs.index.title'),
                        'link' => route('home'),
                    ],
                ];

                $categories = array_reverse($categories);

                foreach ($categories as $key => $category) {
                    $breadcrumbs[] = [
                        'label' => $category->name,
                        'link' => route('shop.category', ['category' => $category->alias])
                    ];
                }

                $pageName = explode(',', $item->name);

                $breadcrumbs[] = [
                    'label' => $pageName[0],
                ];

                $page = $pageName[0];
                break;
            default:
                $breadcrumbs = [];
                $page = __('breadcrumbs.index.title');
                break;
        }

        return view('widgets.breadcrumbs', [
            'config' => $this->config,
            'breadcrumbs' => $breadcrumbs,
            'page' => $page,
        ]);
    }
}
