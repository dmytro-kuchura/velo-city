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
                    'artikul' => $item->product->artikul,
                    'available' => $item->product->available,
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
        $token = $this->cookie ? $this->cookie : $this->uuid;

        if (Auth::check() && Auth::user()) {
            $array = [
                'hash' => null,
                'user_id' => Auth::user()->getAuthIdentifier(),
                'product_id' => $data['item_id'],
            ];
        } else {
            $array = [
                'hash' => $token,
                'user_id' => null,
                'product_id' => $data['item_id'],
            ];
        }

        $this->wishlistRepository->create($array);

        return $token;
    }

    /**
     * Delete item from wishlist
     *
     * @param $item
     */
    public function deleteItem($item)
    {
        $this->wishlistRepository->destroy($item);
    }
}
