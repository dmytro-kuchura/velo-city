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
        return $this->returnResponse([
            'success' => true,
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
}
