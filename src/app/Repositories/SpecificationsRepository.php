<?php

namespace App\Repositories;

use App\Models\Enum\Common;
use App\Models\Specifications;

class SpecificationsRepository implements Repository
{
    private $model = Specifications::class;

    public function paginate()
    {
        return $this->model::orderBy('id', 'desc')->paginate(Common::PAGINATE_LIMIT);
    }

    public function find(int $id)
    {
        return $this->model::where('id', $id)->with('values')->first();
    }

    public function create(array $data)
    {
        /** @var Specifications $model */
        $model = new $this->model;

        $model->name = $data['name'];
        $model->alias = $data['alias'];
        $model->status = $data['status'];
        $model->sort = $data['sort'] ?? 0;
        $model->type = $data['type'];

        return $model->save();
    }

    public function store(int $id, array $data)
    {
        return $this->model::where('id', $id)->update([
            'name' => $data['name'],
            'alias' => $data['alias'],
            'status' => $data['status'],
            'sort' => $data['sort'],
            'type' => $data['type']
        ]);
    }

    public function destroy(int $id)
    {
        return $this->model::where('id', $id)->delete();
    }
}
