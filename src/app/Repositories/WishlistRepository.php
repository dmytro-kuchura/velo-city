<?php

namespace App\Repositories;

use App\Models\Wishlist;

class WishlistRepository implements Repository
{
    protected $model = Wishlist::class;

    public function paginate()
    {
        // TODO: Implement paginate() method.
    }

    public function create(array $data)
    {
        /** @var Wishlist $model */
        $model = new $this->model;

        $model->hash = $data['hash'] ? $data['hash'] : null;
        $model->user_id = $data['user_id'] ? $data['user_id'] : null;
        $model->product_id = $data['product_id'] ? $data['product_id'] : null;

        $model->save();
    }

    public function store(int $id, array $data)
    {
        // TODO: Implement store() method.
    }

    public function destroy(int $id)
    {
        // TODO: Implement destroy() method.
    }

    public function findByHash(string $hash)
    {
        return $this->model::where('hash', $hash)->with('product')->orderBy('created_at', 'asc')->get();
    }

    public function find(int $user_id)
    {
        return $this->model::where('user', $user_id)->with('product')->orderBy('created_at', 'asc')->get();
    }
}
