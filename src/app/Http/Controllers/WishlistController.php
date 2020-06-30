<?php

namespace App\Http\Controllers;

use App\Services\WishlistService;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    /** @var WishlistService */
    private $wishlist;

    public function __construct(WishlistService $wishlist)
    {
        $this->wishlist = $wishlist;
    }

    public function wishlist()
    {
        $result = $this->wishlist->getList();

        return $this->returnResponse([
            'success' => true,
            'result' => $result
        ]);
    }

    public function add(Request $request)
    {
        $uuid = $this->wishlist->addItem($request->all());

        if (!$uuid) {
            return $this->returnResponse([
                'success' => true,
            ]);
        } else {
            return $this->returnResponse([
                'success' => true,
            ], 201, [], ['name' => 'cart', 'value' => $uuid]);
        }
    }
}
