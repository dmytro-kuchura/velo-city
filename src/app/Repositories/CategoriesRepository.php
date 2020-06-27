<?php

namespace App\Repositories;

use App\Models\Catalog;

class CategoriesRepository
{
    protected $model = Catalog::class;

    public function all()
    {
        return $this->model::with('children')->orderBy('id', 'asc')->get();
    }
}
