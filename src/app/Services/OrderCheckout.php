<?php

namespace App\Services;

use App\Repositories\CartItemsRepository;
use App\Repositories\CartRepository;
use App\Repositories\OrderItemsRepository;
use App\Repositories\OrdersRepository;
use App\Repositories\ProductsRepository;

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
    }

    public function createOrder(array $data)
    {
        $this->ordersRepository->create($data);
    }
}
