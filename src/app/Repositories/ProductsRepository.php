<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\Enum\ProductConstants;

class ProductsRepository
{
    protected $model = Product::class;

    public function all()
    {
        return $this->model::paginate(12);
    }

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

    public function updateImage($data)
    {
        return $this->model::where('id', $data['id'])->update(['image' => $data['link']]);
    }

    public function getFeatured(int $limit) {
        return $this->model::where('status', ProductConstants::STATUS_ACTIVE)
            ->limit($limit)
            ->inRandomOrder()
            ->get();
    }

    public function getSpecial(int $limit) {
        return $this->model::where('status', ProductConstants::STATUS_ACTIVE)
            ->where(function ($query) {
                $query->where('sale', ProductConstants::IS_SALE)
                    ->orWhere('top', ProductConstants::IS_TOP);
            })
            ->limit($limit)
            ->inRandomOrder()
            ->get();
    }

    public function getMostViewed(int $limit) {
        return $this->model::where('status', ProductConstants::STATUS_ACTIVE)
            ->limit($limit)
            ->inRandomOrder()
            ->get();
    }

    public function getLatest(int $limit) {
        return $this->model::where('status', ProductConstants::STATUS_ACTIVE)
            ->where('new', ProductConstants::IS_NEW)
            ->limit($limit)
            ->inRandomOrder()
            ->get();
    }
}
