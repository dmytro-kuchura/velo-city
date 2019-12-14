<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItems;
use App\Models\Orders;
use App\Repositories\CartItemsRepository;
use App\Repositories\CartRepository;
use App\Repositories\OrderItemsRepository;
use App\Repositories\OrdersRepository;
use App\Repositories\ProductsRepository;
use Illuminate\Support\Facades\Cookie;

class OrderCheckout
{
    /** @var CartRepository */
    private $cartRepository;

    /** @var CartItemsRepository */
    private $cartItemsRepository;

    /** @var OrdersRepository */
    private $ordersRepository;

    /** @var OrderItemsRepository */
    private $orderItemsRepository;

    /**  @var ProductsRepository */
    private $productsRepository;

    /** @var string */
    private $cookie;

    public function __construct(
        CartRepository $cartRepository,
        CartItemsRepository $cartItemsRepository,
        OrdersRepository $ordersRepository,
        OrderItemsRepository $orderItemsRepository,
        ProductsRepository $productsRepository
    )
    {
        $this->cartRepository = $cartRepository;
        $this->cartItemsRepository = $cartItemsRepository;
        $this->ordersRepository = $ordersRepository;
        $this->orderItemsRepository = $orderItemsRepository;
        $this->productsRepository = $productsRepository;
        $this->cookie = Cookie::get('cart');
    }

    public function createOrder(array $data)
    {
        /* @var Cart $cart */
        $cart = $this->cartRepository->find($this->cookie);

        if ($cart) {
            /** @var CartItems $items */
            $items = $this->cartItemsRepository->find($cart->id);
        }

        /** @var Orders $order */
        $order = $this->ordersRepository->create($data);
        $this->orderItemsRepository->create($items, $order->id);
    }
}
