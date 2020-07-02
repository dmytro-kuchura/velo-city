<?php

namespace App\Services;

use App\Mail\NewOrder;
use App\Models\Cart;
use App\Models\CartItems;
use App\Models\Orders;
use App\Repositories\CartItemsRepository;
use App\Repositories\CartRepository;
use App\Repositories\OrderItemsRepository;
use App\Repositories\OrdersRepository;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;

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

    /** @var string */
    private $cookie;

    public function __construct(
        CartRepository $cartRepository,
        CartItemsRepository $cartItemsRepository,
        OrdersRepository $ordersRepository,
        OrderItemsRepository $orderItemsRepository
    )
    {
        $this->cartRepository = $cartRepository;
        $this->cartItemsRepository = $cartItemsRepository;
        $this->ordersRepository = $ordersRepository;
        $this->orderItemsRepository = $orderItemsRepository;
        $this->cookie = Cookie::get('cart');
    }

    public function createOrder(array $data)
    {
        /* @var Cart $cart */
        $cart = $this->findCart();

        if ($cart) {
            /** @var CartItems $items */
            $items = $this->findCartItems($cart->id);

            /** @var Orders $order */
            $order = $this->ordersRepository->create($data);

            if ($this->orderItemsRepository->create($items, $order->id)) {
                $this->deleteCartItems($cart->id);
            }

            $order = $this->ordersRepository->find($order->id);

            Mail::to($order->email)->send(new NewOrder($order));
        }
    }

    public function findCart()
    {
        return $this->cartRepository->find($this->cookie);
    }

    public function findCartItems(int $cartId)
    {
        return $this->cartItemsRepository->find($cartId);
    }

    public function deleteCartItems(int $cartId)
    {
        return $this->cartItemsRepository->destroyCartItems($cartId);
    }
}
