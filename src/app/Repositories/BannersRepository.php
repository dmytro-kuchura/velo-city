<?php

namespace App\Repositories;

use App\Models\Banners;
use App\Models\Enum\BannerStatus;

class BannersRepository
{
    protected $model = Banners::class;

    public function list() {
        return $this->model::where('status', BannerStatus::STATUS_ACTIVE)->get();
    }

    public function find($id) {
        return $this->model::where('id', $id)->where('status', BannerStatus::STATUS_ACTIVE)->first();
    }

    public function store($id, $data) {

    }

    public function create($data) {

    }

    public function destroy($id) {

    }
}
