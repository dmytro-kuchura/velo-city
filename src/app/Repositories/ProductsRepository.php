<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\Enum\ProductConstants;

class ProductsRepository
{
    protected $model = Product::class;

    public function list() {

    }

    public function find($id) {
        return $this->model::where('id', $id)->where('status', ProductConstants::STATUS_ACTIVE)->first();
    }

    public function store($id, $data) {

    }

    public function create($data) {

    }

    public function destroy($id) {

    }

    public function getFeatured() {
        return $this->model::where('status', ProductConstants::STATUS_ACTIVE)
            ->limit(25)
            ->inRandomOrder()
            ->get();
    }

    public function getSpecial() {
        return $this->model::where('status', ProductConstants::STATUS_ACTIVE)
            ->where(function ($query) {
                $query->where('sale', ProductConstants::IS_SALE)
                    ->orWhere('top', ProductConstants::IS_TOP);
            })
            ->limit(25)
            ->inRandomOrder()
            ->get();
    }

    public function getMostViewed() {
        return $this->model::where('status', ProductConstants::STATUS_ACTIVE)
            ->limit(25)
            ->inRandomOrder()
            ->get();
    }

    public function getLatest() {
        return $this->model::where('status', ProductConstants::STATUS_ACTIVE)
            ->where('new', ProductConstants::IS_NEW)
            ->limit(25)
            ->inRandomOrder()
            ->get();
    }
}
