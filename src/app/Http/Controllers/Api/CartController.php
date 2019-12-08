<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\ShoppingCart;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    /**
     * @var ShoppingCart
     */
    private $shoppingCart;

    public function __construct(ShoppingCart $shoppingCart)
    {
        $this->shoppingCart = $shoppingCart;
    }

    public function list()
    {
        $result = $this->shoppingCart->cartList();

        return $this->returnResponse([
            'success' => true,
            'result' => $result
        ]);
    }

    public function add(Request $request)
    {
        $uuid = $this->shoppingCart->addItem($request->all());

        if (!$uuid) {
            return $this->returnResponse([
                'success' => true,
            ]);
        } else {
            return $this->returnResponse([
                'success' => true,
            ], 201, [], ['name' => 'cart', 'value' => $uuid]);
        }
    }

    public function update(Request $request)
    {
        $this->shoppingCart->updateCart($request->all());

        return $this->returnResponse([
            'success' => true,
        ]);
    }

    public function delete(Request $request)
    {
        $this->shoppingCart->deleteItem($request->route('item'));

        return $this->returnResponse([
            'success' => true,
        ]);
    }
}
