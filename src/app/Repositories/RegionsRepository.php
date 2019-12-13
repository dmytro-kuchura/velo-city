<?php

namespace App\Repositories;

use App\Models\Regions;

class RegionsRepository
{
    protected $model = Regions::class;

    public function list()
    {
        return $this->model::where('status', 1)->orderBy('name_ru', 'asc')->get();
    }
}
