<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItems;
use App\Repositories\ProductsRepository;
use Illuminate\Support\Facades\Cookie;
use App\Repositories\CartRepository;
use App\Repositories\CartItemsRepository;

class ShoppingCart
{
    /**
     * @var CartRepository
     */
    private $cartRepository;

    /**
     * @var CartItemsRepository
     */
    private $cartItemsRepository;

    /**
     * @var ProductsRepository
     */
    private $productsRepository;

    /**
     * @var string
     */
    private $cookie;

    public function __construct(
        CartRepository $cartRepository,
        CartItemsRepository $cartItemsRepository,
        ProductsRepository $productsRepository
    )
    {
        $this->cartRepository = $cartRepository;
        $this->cartItemsRepository = $cartItemsRepository;
        $this->productsRepository = $productsRepository;
        $this->cookie = Cookie::get('cart');
    }

    public function cartList()
    {
        $list = [];
        $total_price = 0;
        $total_quantity = 0;

        if (!$this->cookie) {
            return $list;
        }

        /* @var $cart Cart */
        $cart = $this->cartRepository->find($this->cookie);

        if (!$cart) {
            return $list;
        }

        /* @var $items CartItems[] */
        $items = $this->cartItemsRepository->find($cart->id);

        if (!$items) {
            return $list;
        }

        foreach ($items as $item) {
            $product = $this->productsRepository->find($item->product_id);

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

    public function create()
    {

    }

    public function addItem()
    {

    }

    public function deleteItem($item)
    {
        /* @var $cart Cart */
        $cart = $this->cartRepository->find($this->cookie);

        $this->cartItemsRepository->destroy($cart->id, $item);
    }
}
