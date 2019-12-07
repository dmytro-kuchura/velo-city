<?php

namespace App\Repositories;

use App\Models\Catalog;
use App\Models\Enum\CatalogConstants;

class CatalogRepository
{
    protected $model = Catalog::class;

    public function getTree(): array
    {
        $tree = [];

        $result = $this->model::where('status', CatalogConstants::STATUS_ACTIVE)->get();

        foreach ($result as $obj) {
            $tree[$obj->parent_id][] = $obj;
        }

        return $tree;
    }
}
