<?php

namespace App\Repositories;

use App\Models\Cart;
use App\Models\CartItems;

class CartRepository
{
    protected $cart = Cart::class;

    protected $items = CartItems::class;

    public function create($data)
    {
        $cart = new $this->cart;
        $cart->hash = $data['uuid'];

        $cart->save();

        $items = new $this->items;
        $items->cart_id = $cart->id;
        $items->product_id = $data['item_id'];
        $items->count = $data['count'];

        $items->save();
    }

    public function update($data, $uuid)
    {
        $cart = $this->find($uuid);

        $items = $this->items::where('cart_id', $cart->id)->where('product_id', $data['item_id'])->first();
        $items->count = $items->count + $data['count'];

        $items->save();
    }

    public function find($uuid)
    {
        return $this->cart::where('hash', $uuid)->first();
    }

    public function list($uuid)
    {
        //
    }

    public function destroy()
    {
        //
    }
}
