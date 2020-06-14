<?php

namespace App\Http\Controllers;

use App\Repositories\ProductsRepository;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    private $repository;

    public function __construct(ProductsRepository $productsRepository)
    {
        $this->repository = $productsRepository;
    }

    public function index()
    {

    }

    public function category(Request $request)
    {
        $result = $this->repository->category($request->route('category'));

        if (!$result) {
            abort(404, 'Page not found');
        }

        return view('shop.category', [
            'result' => $result
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function item(Request $request)
    {
        $result = $this->repository->find($request->route('id'));

        if (!$result) {
            abort(404, 'Page not found');
        }

        return view('shop.item', [
            'result' => $result
        ]);
    }
}
