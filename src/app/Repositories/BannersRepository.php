<?php

namespace App\Repositories;

use App\Http\Resources\BannerResource;
use App\Models\Banners;
use App\Models\Enum\BannerStatus;

class BannersRepository
{
    protected $model = Banners::class;

    public function all() {
        return $this->model::paginate(4);
    }

    public function list() {
        return $this->model::where('status', BannerStatus::STATUS_ACTIVE)->get();
    }

    public function find($id) {
        $banner = $this->model::where('id', $id)->first();

        return new BannerResource($banner);
    }

    public function store($id, $data) {

    }

    public function create($data) {

    }

    public function destroy($id) {

    }
}
