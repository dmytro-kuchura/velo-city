<?php

namespace App\Services;

use App\Models\Wishlist;
use App\Repositories\WishlistRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;

class WishlistService
{
    /** @var WishlistRepository */
    private $wishlistRepository;

    /**
     * @var string
     */
    private $cookie;

    /**
     * @var string
     */
    private $uuid;

    public function __construct(
        WishlistRepository $wishlistRepository
    )
    {
        $this->wishlistRepository = $wishlistRepository;
        $this->cookie = Cookie::get('wishlist');
        $this->uuid = (string)Str::uuid();
    }

    public function check()
    {
        if (Auth::check() && Auth::user()) {
            $wishlist = $this->wishlistRepository->find(Auth::user()->getAuthIdentifier());
        } elseif ($this->cookie) {
            $wishlist = $this->wishlistRepository->findByHash($this->cookie);
        } else {
            $wishlist = null;
        }

        return $wishlist;
    }

    /**
     * Get wishlist list
     *
     * @return array
     */
    public function getList()
    {
        $list = [];

        $wishlist = $this->check();

        if (!$wishlist) {
            return [
                'list' => [],
            ];
        }

        /* @var $item Wishlist */
        foreach ($wishlist as $item) {
            if ($item->product) {
                $list[] = [
                    'id' => $item->product->id,
                    'alias' => route('shop.item', ['alias' => $item->product->alias, 'id' => $item->product->id]),
                    'name' => $item->product->name,
                    'image' => $item->product->image,
                    'price' => number_format($item->product->cost, 2, '.', ''),
                ];
            }
        }

        return [
            'list' => $list,
        ];
    }

    /**
     * Add new product to wishlist or update
     *
     * @param $data
     * @return bool|string
     */
    public function addItem($data)
    {
        $wishlist = $this->check();

        if (Auth::check() && Auth::user()) {
            $array = [
                'hash' => null,
                'user_id' => Auth::user()->getAuthIdentifier(),
                'product_id' => $data['item_id'],
            ];
        } else {
            $array = [
                'hash' => $this->uuid,
                'user_id' => null,
                'product_id' => $data['item_id'],
            ];
        }

        if (!$wishlist) {
            $this->wishlistRepository->create($array);

            return $this->uuid;
        }

        return false;
    }

    /**
     * Delete item from cart
     *
     * @param $item
     */
    public function deleteItem($item)
    {
        /* @var $wishlist Wishlist */
        $this->cartRepository->find($this->cookie);
    }
}
