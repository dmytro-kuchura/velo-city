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

    public function getTreeForBreadcrumbs(string $alias): array
    {
        $tree = [];

        /** @var Catalog $result */
        $result = $this->model::where('alias', $alias)->first();

        $tree[] = $result;

        /** @var Catalog $parent */
        $parent = $this->findById($result->parent_id);

        if ($parent) {
            $tree[] = $parent;

            $subParent = $this->findById($parent->parent_id);

            if ($subParent) {
                $tree[] = $subParent;

                $child = $this->findById($subParent->parent_id);

                if ($child) {
                    $tree[] = $child;
                }
            }
        }

        return $tree;
    }

    public function findById(int $id)
    {
        return $this->model::where('id', $id)->first();
    }
}
