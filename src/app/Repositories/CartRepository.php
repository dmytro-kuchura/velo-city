<?php

namespace App\Repositories;

use App\Models\Cart;

class CartRepository
{
    protected $model = Cart::class;

    public function find($uuid)
    {
        return $this->model::where('hash', $uuid)->first();
    }

    public function create($data)
    {
        $cart = new $this->model;
        $cart->hash = $data['uuid'];

        $cart->save();

        return $cart;
    }

    public function update($data, $uuid)
    {
        //
    }

    public function destroy($uuid)
    {
        return $this->model::where('hash', $uuid)->delete();
    }
}
