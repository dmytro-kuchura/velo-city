<?php

namespace App\Repositories;

use App\Models\Cities;

class CitiesRepository
{
    protected $model = Cities::class;

    public function list(int $region)
    {
        return $this->model::where('status', 1)->where('region_id', $region)->orderBy('name_ru', 'asc')->get();
    }
}
