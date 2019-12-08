<?php

namespace App\Services;

class Checkout
{
    /**
     * @var OrderRepository
     */
    private $cartRepository;

    /**
     * @var OrderItemsRepository
     */
    private $cartItemsRepository;

    /**
     * @var ProductsRepository
     */
    private $productsRepository;
}
