<?php


namespace App\Http\Controllers;


use App\Repositories\ProductsRepository;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index()
    {

    }

    public function category()
    {

    }

    /**
     * @param Request $request
     * @param ProductsRepository $productsRepository
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function item(
        Request $request,
        ProductsRepository $productsRepository
    )
    {
        $result = $productsRepository->find($request->route('id'));

        if (!$result) {
            abort(404, 'Page not found');
        }

        return view('shop.item', [
            'result' => $result
        ]);
    }
}
