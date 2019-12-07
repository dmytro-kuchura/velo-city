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

        if ($items) {
            $items->count = $items->count + $data['count'];
            $items->save();
        } else {
            $items = new $this->items;
            $items->cart_id = $cart->id;
            $items->product_id = $data['item_id'];
            $items->count = $data['count'];

            $items->save();
        }

    }

    public function find($uuid)
    {
        return $this->cart::where('hash', $uuid)->first();
    }

    public function items($cart_id)
    {
        return $this->items::where('cart_id', $cart_id)->get();
    }

    public function list($uuid)
    {
        $list = [];
        $total_price = 0;
        $total_quantity = 0;

        if (!$uuid) {
            return $list;
        }

        $cart = $this->find($uuid);

        $items = $this->items($cart->id);

        foreach ($items as $item) {
            $productsRepository = new ProductsRepository();
            $product = $productsRepository->find($item->product_id);

            if ($product) {
                $total_price += number_format($product->cost, 2, '.', '') * $item->count;
                $total_quantity += $item->count;

                $list[] = [
                    'id' => $product->id,
                    'alias' => route('shop.item', ['alias' => $product->alias, 'id' => $product->id]),
                    'name' => $product->name,
                    'image' => '',
                    'count' => $item->count,
                    'price' => number_format($product->cost, 2, '.', ''),
                    'maxcount' => 50,
                ];
            }
        }

        return [
            'list' => $list,
            'totalCount' => $total_quantity,
            'totalPrice' => number_format($total_price, 2, '.', ''),
        ];
    }

    public function destroy()
    {
        //
    }
}
