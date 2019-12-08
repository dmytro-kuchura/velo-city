<?php

namespace App\Repositories;

use App\Models\CartItems;

class CartItemsRepository
{
    protected $model = CartItems::class;

    public function find($cart_id)
    {
        return $this->model::where('cart_id', $cart_id)->get();
    }

    public function create($data, $cart_id)
    {
        $item = new $this->model;
        $item->cart_id = $cart_id;
        $item->product_id = $data['item_id'];
        $item->count = $data['count'];

        $item->save();

        return $item;
    }

    public function update($data, $cart_id)
    {
        $item = $this->model::where('cart_id', $cart_id)->where('product_id', $data['item_id'])->first();

        if ($item) {
            $item->count = $item->count + $data['count'];

            $item->save();
        } else {
            $item = new $this->model;
            $item->cart_id = $cart_id;
            $item->product_id = $data['item_id'];
            $item->count = $data['count'];

            $item->save();
        }

        return $item;
    }

    public function destroy($cart_id, $id)
    {
        return $this->model::where('cart_id', $cart_id)->where('product_id', $id)->delete();
    }
}
