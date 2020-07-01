<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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

    public function list()
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
            ], 201, [], ['name' => 'wishlist', 'value' => $uuid]);
        }
    }

    public function delete(Request $request)
    {
        $this->wishlist->deleteItem($request->route('item'));

        return $this->returnResponse([
            'success' => true,
        ]);
    }
}
