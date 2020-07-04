<?php

namespace App\Repositories;

use App\Models\ProductImages;

class ProductImagesRepository implements Repository
{
    private $model = ProductImages::class;

    public function paginate()
    {
        // TODO: Implement paginate() method.
    }

    public function find(int $id)
    {
        return $this->model::where('product_id', $id)->get();
    }

    public function create(array $data)
    {
        /** @var ProductImages $model */
        $model = new $this->model;
        $model->link = $data['link'];
        $model->product_id = $data['product_id'];
        $model->status = 1;

        return $model->save();
    }

    public function store(int $id, array $data)
    {
        // TODO: Implement store() method.
    }

    public function destroy(int $id)
    {
        return $this->model::where('product_id', $id)->delete();
    }
}
