<?php

namespace App\Repositories;

use App\Models\Enum\Common;
use App\Models\News;

class NewsRepository
{
    protected $model = News::class;

    public function list(int $limit) {
        return $this->model::where('status', Common::STATUS_ACTIVE)->limit($limit)->get();
    }

    public function find($id) {
        return $this->model::where('id', $id)->where('status', Common::STATUS_ACTIVE)->first();
    }

    public function store($id, $data) {

    }

    public function create($data) {

    }

    public function destroy($id) {

    }
}
