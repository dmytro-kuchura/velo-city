<?php

namespace App\Http\Controllers;

use App\Models\Enum\SystemPagesConstants;
use App\Repositories\CatalogRepository;
use App\Repositories\ProductsRepository;
use App\Repositories\SystemPagesRepository;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    /** @var CatalogRepository */
    private $catalogRepository;

    /** @var ProductsRepository */
    private $productsRepository;

    /** @var SystemPagesRepository */
    private $pagesRepository;

    public function __construct(
        ProductsRepository $productsRepository,
        SystemPagesRepository $pagesRepository,
        CatalogRepository $catalogRepository
    )
    {
        $this->productsRepository = $productsRepository;
        $this->catalogRepository = $catalogRepository;
        $this->pagesRepository = $pagesRepository;
    }

    public function index()
    {
        $page = $this->pagesRepository->findBySlug(SystemPagesConstants::SHOP_PAGE);

        $categories = $this->catalogRepository->getMainCategories();

        return view('shop.index', [
            'categories' => $categories,
            'page' => $page,
        ]);
    }

    public function category(Request $request)
    {
        $result = $this->productsRepository->byCategory($request->route('category'), $request->input());

        $filter = $this->productsRepository->byFilter($request->route('category'), $request->input());

        $categories = $this->catalogRepository->getParents($request->route('category'));

        $category = $this->catalogRepository->findByAlias($request->route('category'));

        return view('shop.category', [
            'result' => $result,
            'categories' => $categories,
            'category' => $category,
            'filter' => $filter,
        ]);
    }

    public function item(Request $request)
    {
        $result = $this->productsRepository->find($request->route('id'));

        if (!$result) {
            abort(404, 'Page not found');
        }

        return view('shop.item', [
            'result' => $result
        ]);
    }
}
