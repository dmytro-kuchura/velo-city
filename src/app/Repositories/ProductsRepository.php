<?php

namespace App\Repositories;

use App\Models\Product;

class ProductsRepository
{
    protected $model = Product::class;

    public function list() {

    }

    public function find($id) {
        return $this->model::where('id', $id)->where('status', \App\Models\Enum\Product::STATUS_ACTIVE)->first();
    }

    public function store($id, $data) {

    }

    public function create($data) {

    }

    public function destroy($id) {

    }

    public function getFeatured() {
        return $this->model::where('status', \App\Models\Enum\Product::STATUS_ACTIVE)->limit(25)->inRandomOrder()->get();
    }
}
