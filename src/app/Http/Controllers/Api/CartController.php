<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\CartRepository;use Illuminate\Http\Request;use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;

class CartController extends Controller
{
    protected $repository;

    private $uuid;

    public function __construct(CartRepository $cartRepository) {
        $this->repository = $cartRepository;
        $this->uuid = (string)Str::uuid();
    }

    public function list()
    {
        $result = $this->repository->list(Cookie::get('cart'));

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
        $cookie = Cookie::get('cart');

        $item = $request->route('item');

        $this->repository->destroy($item, $cookie);

        return $this->returnResponse([
            'success' => true,
        ]);
    }
}
