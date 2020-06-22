<?php

namespace App\Http\Controllers;

use App\Repositories\CatalogRepository;
use App\Repositories\ProductsRepository;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    /**+
     * @var CatalogRepository
     */
    private $catalogRepository;

    /**
     * @var ProductsRepository
     */
    private $productsRepository;

    public function __construct(
        ProductsRepository $productsRepository,
        CatalogRepository $catalogRepository
    )
    {
        $this->productsRepository = $productsRepository;
        $this->catalogRepository = $catalogRepository;
    }

    public function index()
    {

    }

    public function category(Request $request)
    {
        $result = $this->productsRepository->category($request->route('category'));

        $categories = $this->catalogRepository->getParents($request->route('category'));

        return view('shop.category', [
            'result' => $result,
            'categories' => $categories,
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
