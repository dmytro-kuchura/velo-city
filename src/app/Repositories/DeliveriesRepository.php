<?php

namespace App\Repositories;

use App\Models\Deliveries;

class DeliveriesRepository
{
    protected $model = Deliveries::class;

    public function list()
    {
        return $this->model::where('status', 1)->orderBy('id', 'asc')->get();
    }
}
