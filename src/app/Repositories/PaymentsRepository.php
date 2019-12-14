<?php

namespace App\Repositories;

use App\Models\Enum\PaymentsStatus;
use App\Models\Payments;

class PaymentsRepository
{
    protected $model = Payments::class;

    public function list() {
        return $this->model::where('status', PaymentsStatus::STATUS_ACTIVE)->get();
    }

    public function find($id) {
        return $this->model::where('id', $id)->where('status', PaymentsStatus::STATUS_ACTIVE)->first();
    }

    public function store($id, $data) {

    }

    public function create($data) {

    }

    public function destroy($id) {

    }
}
