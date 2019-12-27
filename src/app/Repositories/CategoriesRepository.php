<?php

namespace App\Repositories;

use App\Models\Catalog;

class CategoriesRepository
{
    protected $model = Catalog::class;

    public function all()
    {
        return $this->model::orderBy('id', 'asc')->get();
    }
}