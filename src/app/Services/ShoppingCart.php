<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItems;
use App\Repositories\CartRepository;
use App\Repositories\ProductsRepository;
use App\Repositories\CartItemsRepository;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;

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

    /**
     * @var string
     */
    private $uuid;

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
        $this->uuid = (string)Str::uuid();
    }

    /**
     * Get cart list
     *
     * @return array
     */
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

    /**
     * Add new product to cart or update
     *
     * @param $data
     * @return bool|string
     */
    public function addItem($data)
    {
        /* @var $cart Cart */
        $cart = $this->cartRepository->find($this->cookie);

        if (!$cart) {
            /* @var $cart Cart */
            $cart = $this->cartRepository->create($this->uuid);

            $this->cartItemsRepository->create($data, $cart->id);

            return $this->uuid;
        }

        /* @var $item CartItems */
        $item = $this->cartItemsRepository->getItem($data['item_id'], $cart->id);

        if ($item) {
            $data['count'] = $data['count'] + $item->count;

            $this->cartItemsRepository->update($data, $cart->id);
        } else {
            $this->cartItemsRepository->create($data, $cart->id);
        }

        return false;
    }

    /**
     * Update count current cart
     *
     * @param $data
     * @return bool
     */
    public function updateCart($data)
    {
        /* @var $cart Cart */
        $cart = $this->cartRepository->find($this->cookie);

        if (!$cart) {
            return false;
        }

        $this->cartItemsRepository->update($data, $cart->id);
    }

    /**
     * Delete item from cart
     *
     * @param $item
     */
    public function deleteItem($item)
    {
        /* @var $cart Cart */
        $cart = $this->cartRepository->find($this->cookie);

        $this->cartItemsRepository->destroy($cart->id, $item);
    }
}
