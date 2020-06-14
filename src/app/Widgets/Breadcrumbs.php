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
            case 'about':
                $breadcrumbs = [
                    [
                        'label' => __('breadcrumbs.index.title'),
                        'link' => route('home'),
                    ],
                    [
                        'label' => __('breadcrumbs.about.title'),
                    ],
                ];

                $page = __('breadcrumbs.about.title');
                break;
            case 'contacts':
                $breadcrumbs = [
                    [
                        'label' => __('breadcrumbs.index.title'),
                        'link' => route('home'),
                    ],
                    [
                        'label' => __('breadcrumbs.contacts.title'),
                    ],
                ];

                $page = __('breadcrumbs.contacts.title');
                break;
            case 'search':
                $breadcrumbs = [
                    [
                        'label' => __('breadcrumbs.index.title'),
                        'link' => route('home'),
                    ],
                    [
                        'label' => __('breadcrumbs.search.title'),
                    ],
                ];

                $page = __('breadcrumbs.search.title');
                break;
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
