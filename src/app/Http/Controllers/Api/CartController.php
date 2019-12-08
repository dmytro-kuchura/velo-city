<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;
use App\Services\ShoppingCart;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    /**
     * @var ShoppingCart
     */
    private $shoppingCart;

    /**
     * @var string
     */
    private $uuid;

    public function __construct(ShoppingCart $shoppingCart) {
        $this->shoppingCart = $shoppingCart;
        $this->uuid = (string)Str::uuid();
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
        $data = $request->all();

        $cookie = Cookie::get('cart');

        $cart = $this->repository->find($cookie);

        if ($cookie && $cart) {
            $this->repository->update($data, $cookie);

            return $this->returnResponse([
                'success' => true,
            ]);
        } else {
            $data['uuid'] = $this->uuid;

            $this->repository->create($data);

            return $this->returnResponse([
                'success' => true,
            ], 201, [], ['name' => 'cart', 'value' => $this->uuid]);
        }
    }

    public function delete(Request $request)
    {
        $this->shoppingCart->deleteItem($request->route('item'));

        return $this->returnResponse([
            'success' => true,
        ]);
    }
}
