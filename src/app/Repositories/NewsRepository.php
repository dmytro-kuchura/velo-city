<?php

namespace App\Repositories;

use App\Models\News;
use App\Models\Enum\NewsStatus;

class NewsRepository
{
    protected $model = News::class;

    public function list(int $limit) {
        return $this->model::where('status', NewsStatus::STATUS_ACTIVE)->limit($limit)->get();
    }

    public function find($id) {
        return $this->model::where('id', $id)->where('status', NewsStatus::STATUS_ACTIVE)->first();
    }

    public function store($id, $data) {

    }

    public function create($data) {

    }

    public function destroy($id) {

    }
}
