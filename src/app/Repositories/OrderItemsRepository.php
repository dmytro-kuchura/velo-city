<?php

namespace App\Repositories;

use App\Models\CartItems;
use App\Models\OrderItems;
use App\Models\Product;

class OrderItemsRepository
{
    public function create($cartItems, $orderId)
    {
        $productRepository = new ProductsRepository();

        /** @var CartItems[] $cartItems */
        foreach ($cartItems as $item) {
            /** @var Product $product */
            $product = $productRepository->find($item->product_id);

            $orderItem = new OrderItems();
            $orderItem->order_id = $orderId;
            $orderItem->product_id = $product->id;
            $orderItem->count = $item->count;
            $orderItem->cost = $product->cost;

            $orderItem->save();
        }

        return true;
    }
}
